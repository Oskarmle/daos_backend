import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(ensembleIds?: string[]): Promise<UserDocument[]> {
    if (ensembleIds?.length) {
      return this.userModel.find({ ensembleIds: { $in: ensembleIds } }).exec();
    }
    // Return all users if no ensembleIds are provided
    return this.userModel.find().exec();
  }

  findOne(email: string): Promise<UserDocument> {
    const user = this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  update(_id: string, updatedUser: UpdateUserDto): Promise<UserDocument> {
    const updated = this.userModel
      .findByIdAndUpdate(_id, { ...updatedUser }, { new: true })
      .exec();

    if (!updated) {
      throw new Error(`User with the ID ${_id} not found`);
    }
    return updated;
  }

  delete(_id: string) {
    const deletedUser = this.userModel.findByIdAndDelete(_id, { new: true });
    return deletedUser;
  }
}
