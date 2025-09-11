import { Module } from '@nestjs/common';
import { JobsService } from './job.service';
import { JobsController } from './job.controller';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
