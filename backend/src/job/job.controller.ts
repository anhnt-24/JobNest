import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { JobsService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JobStatus } from '@prisma/client';
import { JobListQueryDto } from './dto/list-jobs-query.dto';
import { ApplicationListQueryDto } from './dto/list-application-query.req';
import { SavedJobListQueryDto } from './dto/list-saved-query.req';
@Controller('job')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('/my-applied')
  async getMyAppliedJobs(@Req() req, @Body() query: ApplicationListQueryDto) {
    return this.jobsService.getMyAppliedJobs(+req.user.userId, query);
  }
  @Post('/applied')
  async getAppliedJobs(@Body() query: ApplicationListQueryDto) {
    return this.jobsService.getAppliedJobs(query);
  }

  @Post('/saved')
  async getSavedJobs(@Req() req, @Body() query: SavedJobListQueryDto) {
    return this.jobsService.getSavedJobs(+req.user.userId, query);
  }

  @Get(':id/is-saved')
  async isJobSaved(@Param('id') jobId: string, @Req() req) {
    return this.jobsService.isJobSaved(+req.user.userId, Number(jobId));
  }
  @Post('create')
  async create(@Req() req, @Body() dto: CreateJobDto) {
    return this.jobsService.create(req.user, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @Post()
  findAll(@Body() query: JobListQueryDto) {
    return this.jobsService.getAll(query);
  }
  @Post('/me')
  findByEmployer(@Req() req, @Body() query: JobListQueryDto) {
    return this.jobsService.getListByMe(req.user, query);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.remove(id);
  }

  @Post(':id/apply')
  applyForJob(
    @Param('id') jobId: string,
    @Body() body: { cvId: number; message?: string },
    @Req() req,
  ) {
    return this.jobsService.applyForJob(
      +req.user.userId,
      Number(jobId),
      Number(body.cvId),
      body.message,
    );
  }

  @Post(':id/toggle-save')
  toggleSaveJob(@Param('id') jobId: string, @Req() req) {
    return this.jobsService.toggleSaveJob(+req.user.userId, Number(jobId));
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() { status }: { status: JobStatus },
  ) {
    return this.jobsService.updateStatus(+id, status);
  }
  @Get(':id/cvs')
  async getCVs(@Param('id') id: string) {
    return this.jobsService.getCVsByJob(+id);
  }

  @Get(':id/company')
  async getCompany(@Param('id') id: string) {
    return this.jobsService.getCompanyByJob(+id);
  }
}
