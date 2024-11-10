import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';

export class UploadEssayResponse {
  @ApiProperty({
    description: 'The unique identifier of the essay',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The raw content of the essay',
    example: 'Essay content goes here...',
    nullable: true,
  })
  rawContent: string | null;

  @ApiProperty({
    description: 'The URL where the essay file is stored',
    example: 'https://storage.example.com/essays/file.pdf',
  })
  url: string;

  @ApiProperty({
    description: 'Initial feedback for the essay',
    example: 'Good structure but needs more detail...',
    nullable: true,
  })
  feedback: string | null | JsonValue;

  @ApiProperty({
    description: 'Final feedback for the essay',
    example: 'Excellent work after revisions...',
    nullable: true,
  })
  finalFeedback: string | null;

  @ApiProperty({
    description: 'Final Score',
    example: 970,
    nullable: true,
  })
  totalScore: number | null;

  @ApiProperty({
    description: 'File ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  fileId: string;

  @ApiProperty({
    description: 'The date and time when the essay was created',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the essay was last updated',
    example: '2023-01-02T00:00:00Z',
  })
  updatedAt: Date;
}
