import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, PostsDocument } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';

type PostFilter = {
  postType?: 'Im playing' | 'Im looking for one playing';
  instrument?:
    | 'Violone'
    | 'Violin'
    | 'Viola'
    | 'Viol'
    | 'Vihuela'
    | 'Trumpet'
    | 'Theorbo'
    | 'Slide trumpet'
    | 'Serpent'
    | 'Sackbut'
    | 'Natural trumpet'
    | 'Natural Horn';
};

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: Model<PostsDocument>,
  ) {}

  async findAll(filter: PostFilter): Promise<PostsDocument[]> {
    const query: any = {};
    if (filter.postType) {
      query.postType = filter.postType;
    }
    if (filter.instrument) {
      query.instrument = filter.instrument;
    }
    return this.postsModel.find(query).exec();
  }

  async findOne(_id: string): Promise<PostsDocument> {
    const post = this.postsModel.findOne({ _id }).exec();
    if (!post) {
      throw new UnauthorizedException('Post not found');
    }
    return post;
  }

  async create(post: CreatePostDto): Promise<PostsDocument> {
    const newPost = new this.postsModel(post);
    return await newPost.save();
  }

  async update(
    _id: string,
    updatedPost: UpdatePostDto,
  ): Promise<PostsDocument> {
    if (!updatedPost.updatedAt) {
      updatedPost.updatedAt = new Date();
    }

    const updated = await this.postsModel
      .findByIdAndUpdate(_id, { ...updatedPost }, { new: true })
      .exec();

    if (!updated) {
      throw new UnauthorizedException(`Post with the ID ${_id} not found`);
    }

    return updated;
  }

  async delete(_id: string) {
    const deletedPost = await this.postsModel.findByIdAndDelete(_id, {
      new: true,
    });
    return deletedPost;
  }
}
