import { Controller, Get, Param } from '@nestjs/common';
import { City } from './city.entity';
import { CityService } from './city.service';

@Controller()
export class CityController {
  constructor(private cityService: CityService) {}

  //GET ALL CITIES 
  @Get('cities')
  async getAllAuths(): Promise<City[]> {
    return await this.cityService.findAll();
  }

  //GET ONE CITY BY ID
  @Get('cities/:searchCityId')
  async getCityById(@Param('searchCityId') searchCityId: number): Promise<City> {
    return await this.cityService.findOne(searchCityId);
  }
}