import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
