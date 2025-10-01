/** @format */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question, QuestionDocument } from "./schemas/question.schema";
import * as shortid from "shortid";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}

  async create(dto: CreateQuestionDto, authorId: string) {
    const slug = `q-${shortid.generate()}`;
    const created = new this.questionModel({
      ...dto,
      slug,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return created.save();
  }

  async findAll() {
    return this.questionModel.find().lean();
  }

  async findBySlug(slug: string) {
    const question = await this.questionModel.findOne({ slug }).lean();
    if (!question) throw new NotFoundException("Question not found");
    return question;
  }

  async update(slug: string, patch: UpdateQuestionDto, userId: string) {
    // Use Document type so .save() is available and TS knows about authorId
    const q = (await this.questionModel.findOne({ slug })) as QuestionDocument;
    if (!q) throw new NotFoundException("Question not found");
    if (q.authorId !== userId)
      throw new ForbiddenException("Not allowed to update");
    if (patch.title) q.title = patch.title;
    if (patch.content) q.content = patch.content;
    if (patch.tags) q.tags = patch.tags;
    q.updatedAt = new Date();
    return q.save();
  }

  async remove(slug: string, userId: string) {
    const q = (await this.questionModel.findOne({ slug })) as QuestionDocument;
    if (!q) throw new NotFoundException("Question not found");
    if (q.authorId !== userId)
      throw new ForbiddenException("Not allowed to delete");
    return q.deleteOne();
  }

  async addComment(slug: string, content: string, authorId: string) {
    if (!content || typeof content !== "string" || !content.trim()) {
      throw new BadRequestException("Comment content cannot be empty");
    }
    const question = (await this.questionModel.findOne({
      slug,
    })) as QuestionDocument;
    if (!question) throw new NotFoundException("Question not found");

    const comment = {
      slug: `c-${shortid.generate()}`,
      content: content.trim(),
      authorId,
      createdAt: new Date(),
    };

    if (!question.comments) question.comments = [];
    question.comments.push(comment);
    await question.save();
    return comment;
  }

  async getComments(slug: string) {
    const question = await this.questionModel.findOne({ slug }).lean();
    if (!question) throw new NotFoundException("Question not found");
    return question.comments || [];
  }
}
