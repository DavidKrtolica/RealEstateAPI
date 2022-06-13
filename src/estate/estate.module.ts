import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstateController } from './estate.controller';
import { EstateService } from './estate.service';
import { Estate, EstateSchema } from './estate.schema';
import { Panorama, PanoramaSchema } from 'src/panorama/panorama.schema';
import { PanoramaService } from 'src/panorama/panorama.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Estate.name, schema: EstateSchema, collection: 'estates' },
      { name: Panorama.name, schema: PanoramaSchema, collection: 'panoramas' }
    ])
  ],
  controllers: [EstateController],
  providers: [EstateService, PanoramaService],
})
export class EstateModule {}