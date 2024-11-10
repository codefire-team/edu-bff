import { Essays } from '@prisma/client';
import { EssayEvaluation } from '../services/evaluate-essay.service';

export abstract class EssaysRepository {
  abstract createEssay(data: {
    url: string;
    fileId: string;
    subject: string;
  }): Promise<Essays>;
  abstract indexEssays(): Promise<Essays[]>;
  abstract updateEssayWithEvaluation(
    data: EssayEvaluation,
    totalScore: number,
  ): Promise<void>;
}
