/** @format */

import { Controller, Get, Param, Patch, Req } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getForUser(@Req() req: any) {
    const userId = req?.user?.id;
    return this.notificationsService.getForUser(userId);
  }

  @Patch(":id/read")
  async markAsRead(@Param("id") id: string, @Req() req: any) {
    const userId = req?.user?.id;
    return this.notificationsService.markAsRead(id, userId);
  }
}
