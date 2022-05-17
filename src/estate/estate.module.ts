import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstateController } from './estate.controller';
import { EstateService } from './estate.service';
import { Estate, EstateSchema } from './estate.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Estate.name, schema: EstateSchema, collection: 'estates' }])],
  controllers: [EstateController],
  providers: [EstateService],
})
export class EstateModule {}