import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private svc: TagsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body.name);
  }

  @Get()
  async all() {
    return this.svc.findAll();
  }

  @Get(':slug')
  async one(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return this.svc.remove(slug);
  }
}
