import { Injectable } from '@nestjs/common';
import { EssaysRepository } from '../../repositories/essays.repository';

@Injectable()
export class IndexEssaysService {
  constructor(private readonly essaysRepository: EssaysRepository) {}

  async execute() {
    const essays = await this.essaysRepository.indexEssays();

    return essays.map((essay) => ({
      ...essay,
      totalScore: parseInt(essay.totalScore),
    }));
  }
}
