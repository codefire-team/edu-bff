import { Controller, Get } from '@nestjs/common';
import { GenerateQuizService } from './generate-quiz.service';

@Controller('quizzes')
export class GenerateQuizController {
  constructor(private readonly generateQuizService: GenerateQuizService) {}

  @Get('/generate')
  async handle(): Promise<any> {
    return await this.generateQuizService.execute();
  }
}
