/** @format */

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Req,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { AnswersService } from "../answers/answers.service";

@Controller("questions")
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly answersService: AnswersService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() body: CreateQuestionDto, @Req() req: any) {
    const authorId = req?.user?.id || "anonymous";
    return this.questionsService.create(body, authorId);
  }

  @Get()
  async findAll() {
    return this.questionsService.findAll();
  }

  @Get(":slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.questionsService.findBySlug(slug);
  }

  @Patch(":slug")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param("slug") slug: string,
    @Body() patch: UpdateQuestionDto,
    @Req() req: any
  ) {
    const userId = req?.user?.id || "anonymous";
    return this.questionsService.update(slug, patch, userId);
  }

  @Delete(":slug")
  async remove(@Param("slug") slug: string, @Req() req: any) {
    const userId = req?.user?.id || "anonymous";
    return this.questionsService.remove(slug, userId);
  }

  @Post(":slug/comments")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addComment(
    @Param("slug") slug: string,
    @Body() body: CreateCommentDto,
    @Req() req: any
  ) {
    const authorId = req?.user?.id || "anonymous";
    return this.questionsService.addComment(slug, body.content, authorId);
  }

  @Get(":slug/comments")
  async getComments(@Param("slug") slug: string) {
    return this.questionsService.getComments(slug);
  }

  @Get(":slug/answers")
  async getAnswers(@Param("slug") slug: string) {
    const question = await this.questionsService.findBySlug(slug);
    return this.answersService.findByQuestion(question._id);
  }
}
