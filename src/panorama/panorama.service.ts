import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Panorama, PanoramaDocument } from './panorama.schema';

@Injectable()
export class PanoramaService {
  constructor(@InjectModel(Panorama.name) private panoramaModel: Model<PanoramaDocument>) {}

  async findOne(searchPanoramaId: number): Promise<Panorama> {
      return this.panoramaModel.findOne({ panoramaId: searchPanoramaId }).exec();
  }
}