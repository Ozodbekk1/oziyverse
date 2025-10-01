/** @format */

import {
  Controller,
  Get,
  Patch,
  Param,
  Req,
  Post,
  Body,
  Query,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // POST /notifications -- manual creation for testing
  @Post()
  async create(
    @Body()
    body: {
      userId: string;
      type: string;
      message: string;
      refId?: string;
    }
  ) {
    return this.notificationsService.createForUser(
      body.userId,
      body.type,
      body.message,
      body.refId
    );
  }

  @Get()
  async getForUser(@Query("userId") userId: string) {
    return this.notificationsService.getForUser(userId);
  }

  // @Get()
  // async getForUser(@Req() req: any) {
  //   const userId = req?.user?.id || req.query.userId; // fallback for manual testing
  //   return this.notificationsService.getForUser(userId);
  // }

  @Patch(":id/read")
  async markAsRead(@Param("id") id: string, @Req() req: any) {
    const userId = req?.user?.id || req.query.userId;
    return this.notificationsService.markAsRead(id, userId);
  }
}
