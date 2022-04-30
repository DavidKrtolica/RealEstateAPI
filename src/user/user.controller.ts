import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('users/:searchId')
  async getUserById(@Param('searchId') searchId: Number): Promise<User> {
    return await this.userService.findOne(searchId);
  }

}
