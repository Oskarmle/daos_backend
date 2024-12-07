import { Injectable } from '@nestjs/common';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';

@Injectable()
export class EnsemblesService {
  create(createEnsembleDto: CreateEnsembleDto) {
    return 'This action adds a new ensemble';
  }

  findAll() {
    return `This action returns all ensembles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ensemble`;
  }

  update(id: number, updateEnsembleDto: UpdateEnsembleDto) {
    return `This action updates a #${id} ensemble`;
  }

  remove(id: number) {
    return `This action removes a #${id} ensemble`;
  }
}
