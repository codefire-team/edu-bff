import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { EvaluateEssayService } from './services/evaluate-essay.service';
import { IndexEssayController } from './use-cases/index-essays/index-essays.controller';
import { IndexEssaysService } from './use-cases/index-essays/index-essays.service';
import { UploadEssayController } from './use-cases/upload-essay/upload-essay.controller';
import { UploadEssayService } from './use-cases/upload-essay/upload-essay.service';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      timeout: 600000,
      maxRedirects: 5,
    }),
  ],
  providers: [UploadEssayService, IndexEssaysService, EvaluateEssayService],
  controllers: [UploadEssayController, IndexEssayController],
})
export class EssaysModule {}
