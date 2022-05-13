import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async findAll(): Promise<Auth[]> {
    return await this.authRepository.find();
  }

  async findOne(searchId: number): Promise<Auth> {
    return await this.authRepository.findOne({ where: { authId: searchId } });
  }

  async deleteById(deleteId: number): Promise<DeleteResult> {
    return await this.authRepository.delete(deleteId);
  }

  async create(auth: Auth): Promise<Auth> {
    return await this.authRepository.save(auth);
  }

  async updateById(auth: Auth): Promise<UpdateResult> {
    return await this.authRepository.update(auth.authId, auth);
  }
}