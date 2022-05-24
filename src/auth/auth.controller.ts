import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //GET ALL AUTH OBJECTS
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Get('auths')
  async getAllAuths(): Promise<Auth[]> {
    return await this.authService.findAll();
  }

  //GET ONE AUTH BY ID
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Get('auths/:searchAuthId')
  async getAuthById(@Param('searchAuthId') searchAuthId: number): Promise<Auth> {
    return await this.authService.findOne(searchAuthId);
  }

  //DELETING AN EXISTING AUTH OBJECT BY ID
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Delete('auths/:deleteId')
  async deleteAuthById(@Param('deleteId') deleteId: number): Promise<any> {
    return await this.authService.deleteById(deleteId);
  }

  //UPDATING AN ALREADY EXISTING AUTH
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Put('auths/:updateId')
  async updateAuth(@Param('updateId') updateAuthId, @Body() authData: Auth): Promise<any> {
    authData.authId = Number(updateAuthId);
    console.log(`Update Auth @ ${authData.authId}`);
    return this.authService.updateById(authData);
  }

  //////////////////////////////////// AUTHENTICATION ////////////////////////////////////////////////

  //SIGNUP METHOD ENDPOINT FOR CREATING A NEW AUTH
  @Post('auths/signup')
  async signup(@Body() signupRequest) {
    return this.authService.signup(signupRequest);
  }

  //LOGIN METHOD ENDPOINT FOR GETTING A JWT TOKEN
  @UseGuards(LocalAuthGuard)
  @Post('auths/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //GET INFO ABOUT CURRENT LOGGED-IN AUTH OBJECT
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Get('auths/me')
  async getCurrentAuth(@Request() req) {
    return req.user;
  }
}