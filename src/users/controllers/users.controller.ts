import { Controller, Get, Post, Param, Body, HttpException, HttpStatus, UseFilters, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../create-user.dto';
import { Usuario } from '../entity/user.entity';
import { UserNotFoundExceptionFilter } from '../user-not-found.exception';

@Controller('users')
@UseFilters(UserNotFoundExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      console.log('Received DTO:', createUserDto); 
      const newUser = await this.usersService.createUser(createUserDto);
      console.log('Created User:', newUser); 
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error); 
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Usuario> {
  //   try {
  //     const user = await this.usersService.findOneById(id);
  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }
  //     return user;
  //   } catch (error) {
  //     console.error('Error fetching user by ID:', error); 
  //     throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Get(':id')
  @UseFilters(UserNotFoundExceptionFilter)
  async findOne(@Param('id') id: number): Promise<Usuario> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no econtrado `);
    }
    return user;
  }
}
