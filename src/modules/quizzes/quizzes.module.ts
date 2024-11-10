import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GenerateQuizService } from './use-cases/generate-quiz/generate-quiz.service';
import { GenerateQuizController } from './use-cases/generate-quiz/generate-quiz.controller';

@Module({
  imports: [DatabaseModule],
  providers: [GenerateQuizService],
  controllers: [GenerateQuizController],
})
export class QuizzesModule {}
