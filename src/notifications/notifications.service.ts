/** @format */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Notification,
  NotificationDocument,
} from "./schemas/notification.schema";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private nModel: Model<NotificationDocument>
  ) {}

  async createForUser(
    userId: string,
    type: string,
    message: string,
    refId?: string
  ) {
    const notification = new this.nModel({ userId, type, message, refId });
    return notification.save();
  }

  async getForUser(userId: string) {
    return this.nModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  async markAsRead(notificationId: string, userId: string) {
    return this.nModel.updateOne(
      { _id: notificationId, userId },
      { read: true }
    );
  }
}
