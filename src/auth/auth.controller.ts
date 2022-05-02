import { Controller, Get, Param, Query, Delete } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('auths')
  async getAllAuths(): Promise<Auth[]> {
    return await this.authService.findAll();
  }

  @Get('auths/:searchAuthId')
  async getAuthById(@Param('searchAuthId') searchAuthId: Number): Promise<Auth> {
    return await this.authService.findOne(searchAuthId);
  }

  @Delete('auths/:deleteId')
  async deleteAuthById(@Param('deleteId') deleteId: number): Promise<any> {
    return await this.authService.delete(deleteId);
  }

}