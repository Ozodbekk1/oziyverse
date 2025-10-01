import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionsService } from '../questions/questions.service';

@Controller()
export class AnswersController {
  constructor(private svc: AnswersService, private qSvc: QuestionsService) {}

  @Post('questions/:slug/answers')
  async create(@Param('slug') slug: string, @Body() dto: CreateAnswerDto, @Req() req: any) {
    const question = await this.qSvc.findBySlug(slug);
    const authorId = req?.user?.id || 'anonymous';
    return this.svc.create(question._id, dto, authorId);
  }

  @Get('questions/:slug/answers')
  async findAll(@Param('slug') slug: string) {
    const question = await this.qSvc.findBySlug(slug);
    return this.svc.findByQuestion(question._id);
  }

  @Get('answers/:slug')
  async findOne(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @Patch('answers/:slug/vote')
  async vote(@Param('slug') slug: string, @Body() body: any) {
    const delta = body.type === 'up' ? 1 : -1;
    return this.svc.vote(slug, delta);
  }

  @Patch('answers/:slug/accept')
  async accept(@Param('slug') slug: string, @Req() req: any) {
    // In production verify req.user is question owner
    return this.svc.accept(slug, req?.user?.id || 'anonymous');
  }

  @Patch('answers/:slug')
  async update(@Param('slug') slug: string, @Body() patch: any, @Req() req: any) {
    const userId = req?.user?.id || 'anonymous';
    return this.svc.update(slug, patch, userId);
  }

  @Post('answers/:slug/delete')
  async remove(@Param('slug') slug: string, @Req() req: any) {
    return this.svc.remove(slug, req?.user?.id || 'anonymous');
  }
}
