/** @format */

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { QuestionsModule } from "./questions/questions.module";
import { AnswersModule } from "./answers/answers.module";
// import { CommentsModule } from './comments/comments.module';
import { TagsModule } from "./tags/tags.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { UsersModule } from "./users/users.module";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { SearchModule } from "./search/search.module";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/qna_prod"
    ),
    QuestionsModule,
    AnswersModule,
    // CommentsModule,
    TagsModule,
    NotificationsModule,
    UsersModule,
    LeaderboardModule,
    SearchModule,
  ],
})
export class AppModule {}
