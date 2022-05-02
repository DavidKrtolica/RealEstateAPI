import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertValuesMissingError, Repository, DeleteResult } from 'typeorm';
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

  async findOne(searchId: Number): Promise<User> {
    return await this.userRepository.findOne({ where: { userId: searchId } });
  }

  async delete(byId: number): Promise<DeleteResult> {
    return await this.userRepository.delete(byId);
  }
}