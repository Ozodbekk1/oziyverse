import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private uModel: Model<User>) {}

  async findBySlug(slug: string) {
    const u = await this.uModel.findOne({ slug }).lean();
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async questions(slug: string) {
    const u = await this.uModel.findOne({ slug }).lean();
    if (!u) throw new NotFoundException('User not found');
    // in production join with questions collection
    return { message: 'Implement question list by user' };
  }

  async answers(slug: string) {
    const u = await this.uModel.findOne({ slug }).lean();
    if (!u) throw new NotFoundException('User not found');
    return { message: 'Implement answer list by user' };
  }
}
