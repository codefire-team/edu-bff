import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UploadEssayResponse } from '../../types/upload-essay-response.type';
import { IndexEssaysService } from './index-essays.service';

@Controller('essays')
export class IndexEssayController {
  constructor(private readonly indexEssaysService: IndexEssaysService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'The essay has been successfully uploaded.',
    type: [UploadEssayResponse],
  })
  async handle(): Promise<UploadEssayResponse[]> {
    return await this.indexEssaysService.execute();
  }
}
