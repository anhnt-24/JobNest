import { Job } from '@prisma/client';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { CandidatesModule } from './candidates/candidates.module';
import { RedisModule } from './redis/redis.module';
import { MinioModule } from './minio/minio.module';
import { CvsModule } from './cv/cv.module';
import { CompanyModule } from './company/company.module';
import { JobsModule } from './jobs/job.module';
import { EmployerModule } from './employer/employer.module';
import { ConversationModule } from './conversation/conversation.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    CandidatesModule,
    RedisModule,
    MinioModule,
    CvsModule,
    CompanyModule,
    JobsModule,
    EmployerModule,
    ConversationModule,
    PostsModule,
  ],
})
export class AppModule {}
