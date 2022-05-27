import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  //GET ALL USERS
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  //GET ONE USER BY ID
  @Get('users/:searchId')
  async getUserById(@Param('searchId') searchId: number): Promise<User> {
    return await this.userService.findOne(searchId);
  }

  //GET ONE USER BY FIRST NAME - QUERY PARAMETER
  @Get('usersByName')
  async getUsersByName(@Query('firstName') queryFirstName: string): Promise<User[]> {
    return await this.userService.findByFirstName(queryFirstName);
  }

  //DELETE A USER BY ID
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Delete('users/:deleteId')
  async deleteUserById(@Param('deleteId') deleteId: number): Promise<any> {
    return await this.userService.delete(deleteId);
  }

  //CREATING A COMPLETELY NEW USER
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Post('users')
  async createUser(@Body() userData: User): Promise<any> {
    return this.userService.create(userData);
  }

  //UPDATING AN ALREADY EXISTING USER
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Put('users/:updateId')
  async updateUser(@Param('updateId') updateUserId, @Body() userData: User): Promise<any> {
    userData.userId = Number(updateUserId);
    console.log(`Update User @ ${userData.userId}`);
    return this.userService.updateById(userData);
  }
}