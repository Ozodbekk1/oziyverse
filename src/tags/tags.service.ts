import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './schemas/tag.schema';
import slugify from 'slugify';
import shortid from 'shortid';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tModel: Model<Tag>) {}

  async create(name: string) {
    const slug = `${slugify(name, { lower: true, strict: true })}-${shortid.generate()}`;
    const created = new this.tModel({ name, slug });
    return created.save();
  }

  async findAll() {
    return this.tModel.find().lean();
  }

  async findBySlug(slug: string) {
    const tag = await this.tModel.findOne({ slug }).lean();
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async remove(slug: string) {
    const t = await this.tModel.findOne({ slug });
    if (!t) throw new NotFoundException('Tag not found');
    return t.deleteOne();
  }
}
