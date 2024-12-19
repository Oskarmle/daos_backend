import { Module } from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { EnsemblesController } from './ensembles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from './schemas/ensemble.schema';
// import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
    JwtModule,
    AuthModule,
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
})
export class EnsemblesModule {}
