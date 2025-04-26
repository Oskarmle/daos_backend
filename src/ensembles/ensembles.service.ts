import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ensemble, EnsembleDocument } from './schemas/ensemble.schema';
import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';

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

    const registeredUsersWithObjectId = registeredUsers.map((user) => ({
      fullName: user.fullName,
      id: new mongoose.Types.ObjectId(user.id),
    }));

    const newEnsemble = new this.ensembleModel({
      ...ensembleData,
      registeredUsers: registeredUsersWithObjectId,
    });

    return await newEnsemble.save();
  }

  async update(
    _id: string,
    updatedEnsemble: UpdateEnsembleDto,
  ): Promise<EnsembleDocument> {
    const updated = await this.ensembleModel.findById(
      new mongoose.Types.ObjectId(_id),
    );

    if (!updated) {
      throw new Error(`Ensemble with the ID ${_id} not found`);
    }

    if (
      updatedEnsemble.registeredUsers &&
      updatedEnsemble.registeredUsers.length > 0
    ) {
      // this will be used to check if the user is already registered
      const existingUserIds = updated.registeredUsers.map((user) => user.id);

      // this will throw an error if the user is already registered
      // it works by checking if the user id is already in the registeredUsers array
      const newUsers = updatedEnsemble.registeredUsers.filter(
        (user) => !existingUserIds.includes(new Types.ObjectId(user.id)),
      );

      if (newUsers.length === 0) {
        throw new Error('User is already registered for this ensemble.');
      }

      const newUsersWithObjectId = newUsers.map((user) => ({
        fullName: user.fullName,
        id: new mongoose.Types.ObjectId(user.id), // Correct instantiation
      }));

      // Push only unique users into the registeredUsers array
      updated.registeredUsers.push(...newUsersWithObjectId);
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
