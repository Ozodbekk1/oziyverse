/** @format */

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import * as shortid from "shortid";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private uModel: Model<UserDocument>) {}

  async register(dto: CreateUserDto) {
    const exists = await this.uModel.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    });
    if (exists)
      throw new BadRequestException("Username or email already exists");
    const hashed = await bcrypt.hash(dto.password, 10);
    const slug = `u-${shortid.generate()}`; // <-- Always generate a unique slug
    const user = new this.uModel({
      ...dto,
      slug,
      password: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await user.save();
    const { password, ...rest } = user.toObject();
    return rest;
  }

  async findAll() {
    return this.uModel.find({}, { password: 0 }).lean();
  }

  async findByUsername(username: string) {
    const user = await this.uModel
      .findOne({ username }, { password: 0 })
      .lean();
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async updateProfile(
    username: string,
    patch: Partial<CreateUserDto>,
    requesterId: string
  ) {
    const user = await this.uModel.findOne({ username });
    if (!user) throw new NotFoundException("User not found");
    // Optional: Only allow self-update
    // if (requesterId && user._id.toString() !== requesterId) throw new ForbiddenException('Not allowed');
    if (patch.password) {
      patch.password = await bcrypt.hash(patch.password, 10);
    }
    for (const key of Object.keys(patch)) {
      user[key] = patch[key];
    }
    user.updatedAt = new Date();
    await user.save();
    const { password, ...rest } = user.toObject();
    return rest;
  }
}
