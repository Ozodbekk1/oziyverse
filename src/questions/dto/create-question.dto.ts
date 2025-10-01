/** @format */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsArray,
  ArrayMaxSize,
} from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty({ message: "Content is required" })
  @MaxLength(5000)
  content: string;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  tags?: string[];
}
