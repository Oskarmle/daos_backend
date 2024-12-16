import { Module } from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { EnsemblesController } from './ensembles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from './schemas/Ensemble.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
})
export class EnsemblesModule {}
