import { Module } from '@nestjs/common';
import { RootController } from './shared/root.controller';
import { EssaysModule } from './modules/essays/essays.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { QuizzesModule } from './modules/quizzes/quizzes.module';

@Module({
  imports: [ConfigModule.forRoot(), EssaysModule, QuizzesModule],
  controllers: [RootController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
