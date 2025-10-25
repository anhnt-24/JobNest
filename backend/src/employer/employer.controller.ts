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
  Patch,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerListQueryDto } from './dto/employer-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('employers')
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
  @Post('list')
  async getAll(@Body() query: EmployerListQueryDto) {
    return this.employerService.getAll(query);
  }
  @Put('me')
  async update(@Req() req, @Body() dto: UpdateEmployerDto) {
    return this.employerService.update(+req.user.userId, dto);
  }
  @Patch(':id/active')
  async toggleActive(
    @Param('id') id: string,
    @Body() body: { active: boolean },
  ) {
    return this.employerService.toggleActive(+id, body.active);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.employerService.softDelete(+id);
  }
}
