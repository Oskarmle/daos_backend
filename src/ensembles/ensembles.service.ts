import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ensemble, EnsembleDocument } from './schemas/Ensemble.schema';
import { Model } from 'mongoose';

@Injectable()
export class EnsemblesService {
  constructor(
    @InjectModel(Ensemble.name)
    private readonly ensembleModel: Model<EnsembleDocument>,
  ) {}

  async findAll(): Promise<EnsembleDocument[]> {
    return this.ensembleModel.find().exec();
  }

  async findOne(_id: string): Promise<EnsembleDocument> {
    const ensemble = this.ensembleModel.findOne({ _id }).exec();

    if (!ensemble) {
      throw new UnauthorizedException('Ensemble not found');
    }
    return ensemble;
  }

  async create(ensemble: CreateEnsembleDto): Promise<EnsembleDocument> {
    const { registeredUsers, ...ensembleData } = ensemble;

    const newEnsemble = new this.ensembleModel({
      ...ensembleData,
      registeredUsers: [...registeredUsers],
    });

    return await newEnsemble.save();
  }

  async update(
    _id: string,
    updatedEnsemble: UpdateEnsembleDto,
  ): Promise<EnsembleDocument> {
    const updated = await this.ensembleModel.findById(_id);

    if (!updated) {
      throw new Error(`Ensemble with the ID ${_id} not found`);
    }

    if (
      updatedEnsemble.registeredUsers &&
      updatedEnsemble.registeredUsers.length > 0
    ) {
      updated.registeredUsers.push(...updatedEnsemble.registeredUsers);
    }

    return await updated.save();
  }

  async delete(_id: string) {
    const deletedEnsemble = await this.ensembleModel.findByIdAndDelete(_id, {
      new: true,
    });
    return deletedEnsemble;
  }
}
