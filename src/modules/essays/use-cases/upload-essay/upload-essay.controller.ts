import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadEssayService } from './upload-essay.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UploadEssayResponse } from '../../types/upload-essay-response.type';

@Controller('essays')
export class UploadEssayController {
  constructor(private readonly uploadEssayService: UploadEssayService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The essay has been successfully uploaded.',
    type: UploadEssayResponse,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Essay file to upload',
        },
      },
    },
  })
  async handle(
    @UploadedFile() file: Express.Multer.File,
    @Body('subject') subject: string,
  ): Promise<UploadEssayResponse> {
    return await this.uploadEssayService.execute(file, subject);
  }
}
