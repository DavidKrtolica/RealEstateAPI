import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //GET ALL AUTH OBJECTS
  /* @UseGuards(JwtAuthGuard)
  @Get('auths')
  async getAllAuths(): Promise<Auth[]> {
    return await this.authService.findAll();
  } */

  //GET ONE AUTH BY ID
  /* @UseGuards(JwtAuthGuard)
  @Get('auths/:searchAuthId')
  async getAuthById(@Param('searchAuthId') searchAuthId: number): Promise<Auth> {
    return await this.authService.findOne(searchAuthId);
  } */

  //DELETING AN EXISTING AUTH OBJECT BY ID
  @UseGuards(JwtAuthGuard)
  @Delete('auths/:deleteId')
  async deleteAuthById(@Param('deleteId') deleteId: number): Promise<any> {
    return await this.authService.deleteById(deleteId);
  }

  //CREATING A COMPLETELY NEW AUTH OBJECT
  /* @UseGuards(JwtAuthGuard)
  @Post('auths')
  async createAuth(@Body() authData: Auth): Promise<any> {
    return this.authService.create(authData);
  } */

  //UPDATING AN ALREADY EXISTING AUTH
  @UseGuards(JwtAuthGuard)
  @Put('auths/:updateId')
  async updateAuth(@Param('updateId') updateAuthId, @Body() authData: Auth): Promise<any> {
    authData.authId = Number(updateAuthId);
    console.log(`Update Auth @ ${authData.authId}`);
    return this.authService.updateById(authData);
  }

  //////////////////////////////////// AUTHENTICATION ////////////////////////////////////////////////

  //LOGIN METHOD ENDPOINT
  @UseGuards(LocalAuthGuard)
  @Post('auths/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //SIGNUP METHOD ENDPOINT
  @Post('auths/signup')
  async signup(@Body() signupRequest) {
    return this.authService.signup(signupRequest);
  }
}