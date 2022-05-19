import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Auth } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    const passwordsMatch = await this.compareHashes(passwordInput, auth.password);
    if (passwordsMatch) {
      return auth;
    } else {
      throw new NotFoundException('Wrong email or password!');
    }
  }

  async login(auth: any) {
    const payload = { email: auth.email, sub: auth.authId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(auth: any) {
    if ((await this.authRepository.findOne({ where: { email: auth.email } })) !== undefined) {
      throw new BadRequestException(
        `This email is already taken. Try adding some random digits to it!`
      );
    } else {
      const hashedPassword = await this.encodePassword(auth.password);
      auth.password = hashedPassword; 
      await this.authRepository.save(auth);
      return `Successfully signed up using email - ${auth.email}!`;
    }
  }

  async encodePassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async compareHashes(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}