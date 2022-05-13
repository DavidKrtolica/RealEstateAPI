import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //GET ALL AUTH OBJECTS 
  @Get('auths')
  async getAllAuths(): Promise<Auth[]> {
    return await this.authService.findAll();
  }

  //GET ONE AUTH BY ID
  @Get('auths/:searchAuthId')
  async getAuthById(@Param('searchAuthId') searchAuthId: number): Promise<Auth> {
    return await this.authService.findOne(searchAuthId);
  }

  //DELETING AN EXISTING AUTH OBJECT BY ID
  @Delete('auths/:deleteId')
  async deleteAuthById(@Param('deleteId') deleteId: number): Promise<any> {
    return await this.authService.deleteById(deleteId);
  }

  //CREATING A COMPLETELY NEW AUTH OBJECT
  @Post('auths')
  async createAuth(@Body() authData: Auth): Promise<any> {
    return this.authService.create(authData);
  }

  //UPDATING AN ALREADY EXISTING AUTH
  @Put('auths/:updateId')
  async updateAuth(@Param('updateId') updateAuthId, @Body() authData: Auth): Promise<any> {
    authData.authId = Number(updateAuthId);
    console.log(`Update Auth @ ${authData.authId}`);
    return this.authService.updateById(authData);
  }
}