/** @format */

import { IsOptional, IsString, IsArray } from "class-validator";

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
