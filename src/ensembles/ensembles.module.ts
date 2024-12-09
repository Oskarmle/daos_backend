import { Module } from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { EnsemblesController } from './ensembles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from './schemas/Ensemble.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
})
export class EnsemblesModule {}
