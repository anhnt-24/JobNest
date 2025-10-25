import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApplicationListQueryDto } from './dto/list-application-query.req';

@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/me')
  async getMyAppliedJobs(@Req() req, @Body() query: ApplicationListQueryDto) {
    return this.applicationService.getMyAppliedJobs(+req.user.userId, query);
  }

  @Post('/applied')
  async getAppliedJobs(@Body() query: ApplicationListQueryDto) {
    return this.applicationService.getAppliedJobs(query);
  }
  @Post('jobs/:id')
  applyForJob(
    @Param('id') jobId: string,
    @Body() body: { cvId: number; message?: string },
    @Req() req,
  ) {
    return this.applicationService.applyForJob(
      +req.user.userId,
      Number(jobId),
      Number(body.cvId),
      body.message,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
