import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidatesService } from './candidate.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';

@Controller('candidate')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get('me')
  @Roles(Role.CANDIDATE)
  me(@Request() req) {
    return this.candidatesService.findOne(+req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id);
  }

  @Put('me')
  @Roles(Role.CANDIDATE)
  update(@Request() req, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidatesService.update(+req.user.userId, updateCandidateDto);
  }
}
