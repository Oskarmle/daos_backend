import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { EnsemblesModule } from './ensembles/ensembles.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/daos_test'),
    AppModule,
    EnsemblesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
