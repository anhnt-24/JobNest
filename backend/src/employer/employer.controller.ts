import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerListQueryDto } from './dto/employer-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';

@Controller('employer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Get('me')
  async me(@Req() req) {
    return this.employerService.me(+req.user.userId);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.employerService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employerService.remove(id);
  }

  @Post('get')
  async getAll(@Query() query: EmployerListQueryDto) {
    return this.employerService.getAll(query);
  }
  @Post('get-by-company')
  async getAllByCompany(@Req() req, @Query() query: EmployerListQueryDto) {
    return this.employerService.getAllByCompany(+req.user.userId, query);
  }
  @Put('update')
  async update(@Req() req, @Body() dto: UpdateEmployerDto) {
    return this.employerService.update(+req.user.userId, dto);
  }
  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@Req() req, @UploadedFile() file: MulterFile) {
    return this.employerService.uploadAvatar(+req.user.userId, file);
  }
}
