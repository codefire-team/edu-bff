import { Injectable } from '@nestjs/common';
import { EssaysRepository } from '../repositories/essays.repository';
import { HttpService } from '@nestjs/axios';

interface EvaluateEssayBody {
  id_essay: string;
  path_essay: string;
  subject: string;
}

export interface EssayEvaluation {
  competencia_1_feedback?: string;
  competencia_1_grade?: number;
  competencia_2_feedback?: string;
  competencia_2_grade?: number;
  competencia_3_feedback?: string;
  competencia_3_grade?: number;
  competencia_4_feedback?: string;
  competencia_4_grade?: number;
  competencia_5_feedback?: string;
  competencia_5_grade?: number;
  id_essay?: string;
  raw_feedback?: string;
}

@Injectable()
export class EvaluateEssayService {
  constructor(
    private readonly essaysRepository: EssaysRepository,
    private readonly httpService: HttpService,
  ) {}
  async execute(data: EvaluateEssayBody): Promise<void> {
    console.log('Evaluating essay...');
    const response = await this.httpService.axiosRef.post(
      `${process.env.API_URL}/essay`,
      {
        id_essay: data.id_essay,
        path_essay: data.path_essay,
        subject: data.subject,
      },
    );

    const flattenResponse: EssayEvaluation = this.flattenResponse(
      response.data,
    );

    const totalScore = Object.keys(flattenResponse).reduce((acc, key) => {
      if (key.includes('grade')) {
        acc += flattenResponse[key];
      }
      return acc;
    }, 0);

    await this.essaysRepository.updateEssayWithEvaluation(
      flattenResponse,
      totalScore,
    );
  }

  flattenResponse = (obj: any, result: any = {}): any => {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        this.flattenResponse(item, result);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          this.flattenResponse(value, result);
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  };
}
