// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/user.entity';
import { CreateUserDto } from '../create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      console.log('Creating user with DTO:', createUserDto); // Imprime el DTO recibido
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error in UsersService.createUser:', error); // Imprime el error en la consola
      throw new Error('Error creating user');
    }
  }

  async findOneById(id: number): Promise<Usuario | null> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error in UsersService.findOneById:', error); // Imprime el error en la consola
      throw new Error('Error fetching user by ID');
    }
  }
}
