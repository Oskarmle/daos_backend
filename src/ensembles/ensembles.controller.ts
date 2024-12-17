import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ensembles')
export class EnsemblesController {
  constructor(private readonly ensemblesService: EnsemblesService) {}

  @Get() // Get all ensembles
  async findAll() {
    return this.ensemblesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':_id') // Get a specific ensemble
  findOne(@Param('_id') id: string) {
    return this.ensemblesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post() // Create a new ensemble
  create(@Body() ensemble: CreateEnsembleDto) {
    return this.ensemblesService.create(ensemble);
  }

  @UseGuards(AuthGuard)
  @Patch(':_id') // Update ensemble
  async update(
    @Param('_id') _id: string,
    @Body() ensembleUpdate: UpdateEnsembleDto,
  ) {
    return this.ensemblesService.update(_id, ensembleUpdate);
  }

  @UseGuards(AuthGuard)
  @Delete(':_id') // Delete ensemble
  delete(@Param('_id') _id: string) {
    return this.ensemblesService.delete(_id);
  }
}
