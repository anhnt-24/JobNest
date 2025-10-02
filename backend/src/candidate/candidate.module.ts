import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CandidatesController } from './candidate.controller';
import { CandidatesService } from './candidate.service';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
