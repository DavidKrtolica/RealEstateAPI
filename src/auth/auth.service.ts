import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Auth } from './auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService
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

  /////////////////////////////// AUTHENTICATION ///////////////////////////////////////////////////

  async validateAuth(emailInput: string, passwordInput: string): Promise<any> {
    const auth = await this.authRepository.findOne({ where: { email: emailInput } });
    if (auth.password ===  passwordInput) {
      return auth;
    }
    throw new NotFoundException();
  }

  async login(auth: any) {
    console.log(auth);
    const payload = { email: auth.email, sub: auth.authId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}