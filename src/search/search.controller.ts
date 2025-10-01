import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../questions/schemas/question.schema';

@Controller('search')
export class SearchController {
  constructor(@InjectModel(Question.name) private qModel: Model<Question>) {}

  @Get()
  async search(@Query() q: any) {
    const { query, tag, page = 1, limit = 10 } = q;
    const filter: any = {};
    if (tag) filter.tags = tag;
    if (query) filter.$text = { $search: query };
    const skip = (Number(page) - 1) * Number(limit);
    return this.qModel.find(filter).skip(skip).limit(Number(limit)).lean();
  }
}
