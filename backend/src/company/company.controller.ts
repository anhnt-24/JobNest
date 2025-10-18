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
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';
import { CompanyService } from 'src/company/company.service';
import { UpdateCompanyDto } from 'src/company/dto/update-company.dto';
import { CompanyListQueryDto } from './dto/company-list-query.dto';

@Controller('company')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('me')
  @Roles(Role.COMPANY)
  me(@Request() req) {
    return this.companyService.findByUserId(+req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Put('me')
  @Roles(Role.COMPANY)
  update(@Request() req, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateByUserId(
      +req.user.userId,
      updateCompanyDto,
    );
  }
  @Post('/get-all')
  async getCompanies(@Body() query: CompanyListQueryDto) {
    return this.companyService.getCompanies(query);
  }

  @Patch('cover')
  @Roles(Role.COMPANY)
  @UseInterceptors(FileInterceptor('cover'))
  async uploadCover(@Request() req, @UploadedFile() file: MulterFile) {
    return this.companyService.updateCover(+req.user.userId, file);
  }
}
