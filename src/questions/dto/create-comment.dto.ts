/** @format */

import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: "Comment content cannot be empty" })
  @MaxLength(500, { message: "Comment too long" })
  content: string;
}
