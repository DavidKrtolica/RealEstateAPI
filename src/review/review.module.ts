import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Estate, EstateSchema } from '../estate/estate.schema';
import { EstateService } from 'src/estate/estate.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Panorama, PanoramaSchema } from 'src/panorama/panorama.schema';
import { PanoramaService } from 'src/panorama/panorama.service';

@Module({
  //ADDING MONGOOSE MODULE TO BE ABLE TO USE THE ESTATE SERVICE IN THE REVIEW SERVICE
  imports: [
    MongooseModule.forFeature([
      { name: Estate.name, schema: EstateSchema, collection: 'estates' },
      { name: Panorama.name, schema: PanoramaSchema, collection: 'panoramas' }
    ])
  ],
  providers: [ReviewService, EstateService, PanoramaService],
  controllers: [ReviewController],
})
export class ReviewModule {}