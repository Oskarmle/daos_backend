import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';

@Controller('ensembles')
export class EnsemblesController {
  constructor(private readonly ensemblesService: EnsemblesService) {}

  @Get() // Get all ensembles
  async findAll() {
    return this.ensemblesService.findAll();
  }

  @Get(':_id') // Get a specific ensemble
  findOne(@Param('_id') id: string) {
    return this.ensemblesService.findOne(id);
  }

  @Post() // Create a new ensemble
  create(@Body() ensemble: CreateEnsembleDto) {
    return this.ensemblesService.create(ensemble);
  }

  @Patch(':_id') // Update ensemble
  update(@Param('_id') _id: string, @Body() ensembleUpdate: UpdateEnsembleDto) {
    return this.ensemblesService.update(_id, ensembleUpdate);
  }

  @Delete(':_id') // Delete ensemble
  delete(@Param('_id') _id: string) {
    return this.ensemblesService.delete(_id);
  }
}
