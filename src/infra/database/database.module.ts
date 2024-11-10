import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EssaysRepository } from 'src/modules/essays/repositories/essays.repository';
import { PrismaEssaysRepository } from 'src/modules/essays/infra/prisma/essays-prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: EssaysRepository,
      useClass: PrismaEssaysRepository,
    },
  ],
  exports: [PrismaService, EssaysRepository],
})
export class DatabaseModule {}
