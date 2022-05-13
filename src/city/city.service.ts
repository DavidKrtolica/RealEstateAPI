import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertValuesMissingError, Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find();
  }

  async findOne(searchId: number): Promise<City> {
    return await this.cityRepository.findOne({ where: { cityId: searchId } });
  }
}