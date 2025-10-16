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
  Body,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerListQueryDto } from './dto/employer-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.employerService.delete(id);
  }

  @Post('get')
  async getAll(@Query() query: EmployerListQueryDto) {
    return this.employerService.getAll(query);
  }
  @Post('company')
  async getAllByCompany(@Req() req, @Query() query: EmployerListQueryDto) {
    return this.employerService.getAllByCompany(+req.user.userId, query);
  }
  @Put('update')
  async update(@Req() req, @Body() dto: UpdateEmployerDto) {
    return this.employerService.update(+req.user.userId, dto);
  }
}
