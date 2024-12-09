import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostsDocument = HydratedDocument<Posts>;

@Schema()
export class Posts {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  postType: string;

  @Prop({ required: true })
  instrument: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  area: string;

  @Prop()
  @Optional()
  ensembleName: string;

  @Prop()
  @Optional()
  website: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: () => new Date(), required: true })
  createdAt: Date;

  @Prop({ default: () => new Date(), required: true })
  updatedAt: Date;

  @Prop()
  @Optional()
  deactivatedAt: Date;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
