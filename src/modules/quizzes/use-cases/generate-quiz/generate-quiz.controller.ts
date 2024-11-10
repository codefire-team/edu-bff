import { Controller, Get, Query } from '@nestjs/common';
import { GenerateQuizService } from './generate-quiz.service';

@Controller('quizzes')
export class GenerateQuizController {
  constructor(private readonly generateQuizService: GenerateQuizService) {}

  @Get('/generate')
  async handle(@Query('query') query: string): Promise<any> {
    return await this.generateQuizService.execute(query);
  }
}
