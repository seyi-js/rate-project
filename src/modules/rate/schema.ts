import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CoinEnum,
  CoinType,
  RateSourceEnum,
  RateSourceType,
} from './interface';

export type RateDocument = Rate & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Rate {
  @Prop({
    required: true,
    enum: CoinEnum,
  })
  coin: CoinType;

  @Prop({
    required: true,
    type: Number,
  })
  rate: number;

  @Prop({
    required: true,
    enum: RateSourceEnum,
  })
  source: RateSourceType;
}

const RateSchema = SchemaFactory.createForClass(Rate);

RateSchema.loadClass(Rate);

export { RateSchema };
