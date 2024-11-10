import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GenerateQuizService } from './use-cases/generate-quiz/generate-quiz.service';
import { GenerateQuizController } from './use-cases/generate-quiz/generate-quiz.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      timeout: 600000,
      maxRedirects: 5,
    }),
  ],
  providers: [GenerateQuizService],
  controllers: [GenerateQuizController],
})
export class QuizzesModule {}
