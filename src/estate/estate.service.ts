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

  async insertEstate(estate: any) {
    const newEstate = new this.estateModel({
      estateId: estate.estateId,
      city: estate.city,
      estateAddress: estate.estateAddress,
      estateType: estate.estateType,
      estateSize: estate.estateSize,
      rooms: estate.rooms,
      ownerId: estate.ownerId,
      targetPrice: estate.targetPrice,
      forRent: estate.forRent,
      forSale: estate.forSale
    });
    const result = await newEstate.save();
    return result;
  }

  async deleteAnEstateByEstateId(deleteEstateId: number): Promise<any> {
    return this.estateModel.deleteOne({ estateId: deleteEstateId }).exec();
  }

  async updateEstateById(searchId: number, updatedEstate: any) {
    const estate = await this.estateModel.findOne({ estateId: searchId }).exec();
    if (updatedEstate.city) {
      estate.city = updatedEstate.city;
    }
    if (updatedEstate.estateAddress) {
      estate.estateAddress = updatedEstate.estateAddress;
    }
    if (updatedEstate.estateType) {
      estate.estateType = updatedEstate.estateType;
    }
    if (updatedEstate.estateSize) {
      estate.estateSize = updatedEstate.estateSize;
    }
    if (updatedEstate.rooms) {
      estate.rooms = updatedEstate.rooms;
    }
    if (updatedEstate.ownerId) {
      estate.ownerId = updatedEstate.ownerId;
    }
    if (updatedEstate.targetPrice) {
      estate.targetPrice = updatedEstate.targetPrice;
    }
    if (updatedEstate.forRent) {
      estate.forRent = updatedEstate.forRent;
    }
    if (updatedEstate.forSale) {
      estate.forSale = updatedEstate.forSale;
    }
    estate.save();
    return `Successfully updated Estate with ID: ${estate.estateId} at address ${estate.estateAddress} !`
  }
}