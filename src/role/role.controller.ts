import { Controller, Get, Param } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {}

  //GET ALL ROLES 
  @Get('roles')
  async getAllRoles(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  //GET ONE ROLE BY ID
  @Get('roles/:searchRoleId')
  async getRoleById(@Param('searchRoleId') searchRoleId: number): Promise<Role> {
    return await this.roleService.findOne(searchRoleId);
  }
}