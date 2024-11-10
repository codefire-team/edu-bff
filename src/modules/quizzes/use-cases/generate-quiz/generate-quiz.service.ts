import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateQuizService {
  constructor(private readonly httpService: HttpService) {}

  async execute(query: string): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      `${process.env.API_URL}/generate-mock`,
      {
        query,
        k: 5,
      },
    );

    return response.data.map((question) => ({
      question: question.question,
      alternatives: question.options,
      answer: question.options.findIndex(
        (option: string) => option.at(0) === question.answer.at(0),
      ),
    }));
  }
}
