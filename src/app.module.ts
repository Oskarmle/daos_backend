import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsemblesModule } from './ensembles/ensembles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/daos'),
    UsersModule,
    EnsemblesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
