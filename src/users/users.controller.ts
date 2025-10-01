import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get(':slug')
  async profile(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @Get(':slug/questions')
  async questions(@Param('slug') slug: string) {
    return this.svc.questions(slug);
  }

  @Get(':slug/answers')
  async answers(@Param('slug') slug: string) {
    return this.svc.answers(slug);
  }
}
