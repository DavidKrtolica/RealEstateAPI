import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Panorama } from 'src/panorama/panorama.schema';

export type EstateDocument = Estate & Document;

@Schema()
export class Estate {
  @Prop({ required: true })
  estateId: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  estateAddress: string;

  @Prop({ required: true })
  estateType: string;

  @Prop({ required: true })
  estateSize: string;

  @Prop({ required: true })
  rooms: number;
    
  @Prop({ required: true })
  ownerId: number;

  @Prop({ required: true })
  targetPrice: string;

  @Prop({ required: true })
  forRent: boolean;

  @Prop({ required: true })
  forSale: boolean;

  @Prop({ required: false })
  panorama?: Panorama;
}

export const EstateSchema = SchemaFactory.createForClass(Estate);