import { Body, Controller, Delete, Get, Param, Patch, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private svc: NotificationsService) {}

  @Get()
  async all(@Req() req: any) {
    const userId = req?.user?.id || 'anonymous';
    return this.svc.findForUser(userId);
  }

  @Patch(':slug/read')
  async markRead(@Param('slug') slug: string, @Req() req: any) {
    const userId = req?.user?.id || 'anonymous';
    return this.svc.markRead(slug, userId);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string, @Req() req: any) {
    const userId = req?.user?.id || 'anonymous';
    return this.svc.remove(slug, userId);
  }
}
