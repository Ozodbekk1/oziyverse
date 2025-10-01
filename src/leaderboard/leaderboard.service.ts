import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class LeaderboardService {
  constructor(@InjectModel(User.name) private uModel: Model<User>) {}

  async top(limit = 10) {
    return this.uModel.find().sort({ reputation: -1 }).limit(Number(limit)).lean();
  }
}
