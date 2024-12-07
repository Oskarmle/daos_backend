import { Module } from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { EnsemblesController } from './ensembles.controller';

@Module({
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
})
export class EnsemblesModule {}
