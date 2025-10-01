import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import shortid from 'shortid';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private nModel: Model<Notification>) {}

  async create(userId: string, message: string, entityType: string, entityId: string) {
    const slug = `n-${shortid.generate()}`;
    const created = new this.nModel({ userId, message, entityType, entityId, slug });
    return created.save();
  }

  async findForUser(userId: string) {
    return this.nModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  async markRead(slug: string, userId: string) {
    const n = await this.nModel.findOne({ slug });
    if (!n) throw new NotFoundException('Notification not found');
    if (n.userId.toString() !== userId) throw new NotFoundException('Not allowed');
    n.isRead = true;
    return n.save();
  }

  async remove(slug: string, userId: string) {
    const n = await this.nModel.findOne({ slug });
    if (!n) throw new NotFoundException('Notification not found');
    if (n.userId.toString() !== userId) throw new NotFoundException('Not allowed');
    return n.deleteOne();
  }
}
