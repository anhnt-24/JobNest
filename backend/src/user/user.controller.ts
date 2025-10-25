import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/list')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  async me(@Req() req) {
    return this.userService.findOne(+req.user.userId);
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@Req() req, @UploadedFile() file: MulterFile) {
    return this.userService.uploadAvatar(+req.user.userId, file);
  }
  @Patch(':id/active')
  updateActive(
    @Param('id', ParseIntPipe) id: number,
    @Body('active') active: boolean,
  ) {
    return this.userService.updateActiveStatus(id, active);
  }

  @Patch(':id/verified')
  updateVerified(
    @Param('id', ParseIntPipe) id: number,
    @Body('verified') verified: boolean,
  ) {
    return this.userService.updateVerifiedStatus(id, verified);
  }
}
