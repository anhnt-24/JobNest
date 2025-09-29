import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvService } from './cv.service';
import { File as MulterFile } from 'multer';
import { CvListQueryDto } from './dto/cv-list-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('cvs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCv(
    @Req() req,
    @UploadedFile() file: MulterFile,
    @Body('title') title: string,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn file CV');
    return this.cvService.uploadCv(Number(req.user.userId), title, file);
  }

  @Post('me')
  async getCvsByCandidate(@Req() req, @Body() query: CvListQueryDto) {
    return this.cvService.getCvsByCandidate(Number(req.user.userId), query);
  }

  @Post('get')
  async getAll(@Body() query: CvListQueryDto) {
    return this.cvService.getAll(query);
  }

  @Patch(':id')
  async updateCv(
    @Param('id') id: string,
    @Body() data: { title?: string; thumbnailUrl?: string },
  ) {
    return this.cvService.updateCv(Number(id), data);
  }
  @Delete(':id')
  async deleteCv(@Param('id') id: string) {
    return this.cvService.deleteCv(Number(id));
  }
}
