import { Public } from './../auth/decorators/public.decorator';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Put,
  Patch,
} from '@nestjs/common';
import { JobsService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JobStatus, Role } from '@prisma/client';
import { JobListQueryDto } from './dto/list-jobs-query.dto';
import { SavedJobListQueryDto } from './dto/list-saved-query.req';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('/saved')
  async getSavedJobs(@Req() req, @Body() query: SavedJobListQueryDto) {
    return this.jobsService.getSavedJobs(+req.user.userId, query);
  }

  @Get('/:id/is-saved')
  async isJobSaved(@Param('id') jobId: string, @Req() req) {
    return this.jobsService.isJobSaved(+req.user.userId, Number(jobId));
  }

  @Post()
  @Roles(Role.EMPLOYER)
  async create(@Req() req, @Body() dto: CreateJobDto) {
    return this.jobsService.create(req.user.userId, dto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @Post('list')
  findAll(@Body() query: JobListQueryDto) {
    return this.jobsService.getAll(query);
  }
  @Post('/me')
  getListByMe(@Req() req, @Body() query: JobListQueryDto) {
    return this.jobsService.getListByMe(req.user, query);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.delete(id);
  }

  @Post(':id/save')
  toggleSaveJob(@Param('id') jobId: string, @Req() req) {
    return this.jobsService.toggleSaveJob(+req.user.userId, Number(jobId));
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() { status }: { status: JobStatus },
  ) {
    return this.jobsService.updateStatus(+id, status);
  }
}
