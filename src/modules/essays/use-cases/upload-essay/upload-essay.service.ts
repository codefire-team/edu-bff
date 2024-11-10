import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { EssaysRepository } from '../../repositories/essays.repository';
import { EvaluateEssayService } from '../../services/evaluate-essay.service';

@Injectable()
export class UploadEssayService {
  private client: S3Client;
  constructor(
    private readonly essaysRepository: EssaysRepository,
    private readonly evaluateEssayService: EvaluateEssayService,
  ) {
    this.client = new S3Client({
      region: 'auto',
    });
  }

  async execute(file: Express.Multer.File, subject: string) {
    if (!file) throw new UnprocessableEntityException('No file provided');

    const fileExtension = file.originalname.split('.').pop();

    if (
      fileExtension.toLowerCase() !== 'pdf' &&
      fileExtension.toLowerCase() !== 'png' &&
      fileExtension.toLowerCase() !== 'jpg'
    ) {
      throw new UnprocessableEntityException('Invalid file extension');
    }

    const fileId = randomUUID();

    const fileName = `${fileId}.${fileExtension.toLowerCase()}`;

    const upload = new Upload({
      params: {
        Bucket: 'essays',
        Key: fileName,
        Body: file.buffer,
      },
      client: this.client,
      queueSize: 3,
    });

    await upload.done();

    const url = await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: 'essays',
        Key: fileName,
      }),
      { expiresIn: 60 * 60 * 24 },
    );

    const essay = await this.essaysRepository.createEssay({
      url,
      fileId,
      subject,
    });

    this.evaluateEssayService.execute({
      id_essay: essay.id,
      path_essay: essay.url,
      subject: essay.subject,
    });

    return {
      ...essay,
      totalScore: parseInt(essay.totalScore),
    };
  }
}
