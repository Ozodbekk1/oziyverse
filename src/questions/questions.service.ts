/** @format */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question, QuestionDocument } from "./schemas/question.schema";
import shortid from "shortid";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}

  async create(
    dto: { title: string; content: string; tags?: string[] },
    authorId: string
  ) {
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

  async addComment(slug: string, content: string, authorId: string) {
    const question = await this.questionModel.findOne({ slug });
    if (!question) throw new NotFoundException("Question not found");

    const comment = {
      slug: `c-${shortid.generate()}`,
      content,
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
