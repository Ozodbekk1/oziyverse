/** @format */
import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { QuestionsService } from "./questions.service";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post(":slug/comments")
  async addComment(
    @Param("slug") slug: string,
    @Body() body: { content: string },
    @Req() req: any
  ) {
    const authorId = req?.user?.id || "anonymous";
    return this.questionsService.addComment(slug, body.content, authorId);
  }

  @Get(":slug/comments")
  async getComments(@Param("slug") slug: string) {
    return this.questionsService.getComments(slug);
  }
}
