import { Controller, Get, Param } from '@nestjs/common';
import { Estate } from './estate.schema';
import { EstateService } from './estate.service';

@Controller()
export class EstateController {
  constructor(private estateService: EstateService) {}

  //GET ALL ESTATES 
  @Get('estates')
  async getAllEstates(): Promise<Estate[]> {
    return await this.estateService.findAll();
  }

  //GET ONE ESTATE BY ID
  @Get('estates/:searchEstateId')
  async getEstateById(@Param('searchEstateId') searchEstateId: number): Promise<Estate> {
    return await this.estateService.findOne(searchEstateId);
  }
}