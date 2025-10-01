/** @format */

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("register")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() body: CreateUserDto) {
    return this.usersService.register(body);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":username")
  async findByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch(":username")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(
    @Param("username") username: string,
    @Body() patch: Partial<CreateUserDto>,
    @Req() req: any
  ) {
    // You can check req.user.id matches the user for security in a real app!
    return this.usersService.updateProfile(
      username,
      patch,
      req?.user?.id || null
    );
  }
}
