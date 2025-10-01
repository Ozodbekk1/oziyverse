import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private svc: LeaderboardService) {}

  @Get()
  async top(@Query('limit') limit = 10) {
    return this.svc.top(limit);
  }
}
