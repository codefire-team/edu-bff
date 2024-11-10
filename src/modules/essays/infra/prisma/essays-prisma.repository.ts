import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { EssaysRepository } from '../../repositories/essays.repository';
import { Injectable } from '@nestjs/common';
import { Essays } from '@prisma/client';
import { EssayEvaluation } from '../../services/evaluate-essay.service';

@Injectable()
export class PrismaEssaysRepository implements EssaysRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createEssay(data: { url: string; fileId: string; subject: string }) {
    return await this.prismaService.essays.create({
      data: {
        url: data.url,
        fileId: data.fileId,
        subject: data.subject,
      },
    });
  }

  async indexEssays(): Promise<Essays[]> {
    return await this.prismaService.essays.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateEssayWithEvaluation(
    data: EssayEvaluation,
    totalScore: number,
  ): Promise<void> {
    await this.prismaService.essays.update({
      where: {
        id: data.id_essay,
      },
      data: {
        feedback: JSON.parse(JSON.stringify(data)),
        rawContent: data.raw_feedback,
        totalScore: String(totalScore),
      },
    });
  }
}
