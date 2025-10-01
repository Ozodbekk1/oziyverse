/** @format */

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Answer } from "./schemas/answer.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { generate } from "shortid"; // ✅ fixed import

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private aModel: Model<Answer>) {}

  async create(questionId: string, dto: CreateAnswerDto, authorId: string) {
    const slug = `a-${generate()}`; // ✅ safe now
    const created = new this.aModel({
      ...dto,
      questionId,
      authorId,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return created.save();
  }

  async findByQuestion(questionId: string) {
    return this.aModel.find({ questionId }).lean();
  }

  async findBySlug(slug: string) {
    const a = await this.aModel.findOne({ slug }).lean();
    if (!a) throw new NotFoundException("Answer not found");
    return a;
  }

  async vote(slug: string, delta: number) {
    const updated = await this.aModel.findOneAndUpdate(
      { slug },
      { $inc: { votes: delta }, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) throw new NotFoundException("Answer not found");
    return updated;
  }

  async accept(slug: string, questionOwnerId: string) {
    const a = await this.aModel.findOne({ slug });
    if (!a) throw new NotFoundException("Answer not found");
    a.isAccepted = true;
    a.updatedAt = new Date();
    await a.save();
    return a;
  }

  async update(slug: string, patch: Partial<CreateAnswerDto>, userId: string) {
    const a = await this.aModel.findOne({ slug });
    if (!a) throw new NotFoundException("Answer not found");
    if (a.authorId.toString() !== userId)
      throw new ForbiddenException("Not allowed");
    if (patch.content) a.content = patch.content;
    a.updatedAt = new Date();
    return a.save();
  }

  async remove(slug: string, userId: string) {
    const a = await this.aModel.findOne({ slug });
    if (!a) throw new NotFoundException("Answer not found");
    if (a.authorId.toString() !== userId)
      throw new ForbiddenException("Not allowed");
    return a.deleteOne();
  }
}

// import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Answer } from './schemas/answer.schema';
// import { CreateAnswerDto } from './dto/create-answer.dto';
// import shortid from 'shortid';

// @Injectable()
// export class AnswersService {
//   constructor(@InjectModel(Answer.name) private aModel: Model<Answer>) {}

//   async create(questionId: string, dto: CreateAnswerDto, authorId: string) {
//     const slug = `a-${shortid.generate()}`;
//     const created = new this.aModel({ ...dto, questionId, authorId, slug });
//     return created.save();
//   }

//   async findByQuestion(questionId: string) {
//     return this.aModel.find({ questionId }).lean();
//   }

//   async findBySlug(slug: string) {
//     const a = await this.aModel.findOne({ slug }).lean();
//     if (!a) throw new NotFoundException('Answer not found');
//     return a;
//   }

//   async vote(slug: string, delta: number) {
//     const updated = await this.aModel.findOneAndUpdate({ slug }, { $inc: { votes: delta } }, { new: true });
//     if (!updated) throw new NotFoundException('Answer not found');
//     return updated;
//   }

//   async accept(slug: string, questionOwnerId: string) {
//     const a = await this.aModel.findOne({ slug });
//     if (!a) throw new NotFoundException('Answer not found');
//     a.isAccepted = true;
//     await a.save();
//     return a;
//   }

//   async update(slug: string, patch: Partial<CreateAnswerDto>, userId: string) {
//     const a = await this.aModel.findOne({ slug });
//     if (!a) throw new NotFoundException('Answer not found');
//     if (a.authorId.toString() !== userId) throw new ForbiddenException('Not allowed');
//     if (patch.content) a.content = patch.content;
//     return a.save();
//   }

//   async remove(slug: string, userId: string) {
//     const a = await this.aModel.findOne({ slug });
//     if (!a) throw new NotFoundException('Answer not found');
//     if (a.authorId.toString() !== userId) throw new ForbiddenException('Not allowed');
//     return a.deleteOne();
//   }
// }
