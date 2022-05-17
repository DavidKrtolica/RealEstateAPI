import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Estate, EstateDocument } from './estate.schema';

@Injectable()
export class EstateService {
  constructor(@InjectModel(Estate.name) private estateModel: Model<EstateDocument>) {}

  async findAll(): Promise<Estate[]> {
    return this.estateModel.find().exec();
  }

  async findOne(searchEstateId: number): Promise<Estate> {
      return this.estateModel.findOne({ estateId: searchEstateId }).exec();
  }
}