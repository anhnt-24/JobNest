import { Job } from '@prisma/client';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { CandidatesModule } from './candidate/candidate.module';
import { RedisModule } from './redis/redis.module';
import { MinioModule } from './minio/minio.module';
import { CvsModule } from './cv/cv.module';
import { CompanyModule } from './company/company.module';
import { JobsModule } from './job/job.module';
import { EmployerModule } from './employer/employer.module';
import { ConversationModule } from './conversation/conversation.module';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/category.module';
import { IndustryModule } from './industry/industry.module';
import { ApplicationModule } from './application/application.module';
import { UserModule } from './user/user.module';

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
    CategoryModule,
    IndustryModule,
    ApplicationModule,
    UserModule,
  ],
})
export class AppModule {}
