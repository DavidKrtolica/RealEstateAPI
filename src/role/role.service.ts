import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(searchId: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { roleId: searchId } });
  }
}