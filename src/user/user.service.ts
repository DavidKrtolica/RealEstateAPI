import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(searchId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { userId: searchId } });
  }

  async delete(byId: number): Promise<DeleteResult> {
    return await this.userRepository.delete(byId);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateById(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.userId, user);
  }
}