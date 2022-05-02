import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertValuesMissingError, Repository, DeleteResult, FindConditions, ObjectID } from 'typeorm';
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

  async findOne(searchId: Number): Promise<Auth> {
    return await this.authRepository.findOne({ where: { authId: searchId } });
  }

  async delete(byId: number): Promise<DeleteResult> {
    return await this.authRepository.delete(byId);
  }
}