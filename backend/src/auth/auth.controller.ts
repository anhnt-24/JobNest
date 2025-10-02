import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './decorators/public.decorator';
import { CreateCompanyDto } from './dto/company-register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { CreateEmployerDto } from './dto/employer-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refresh_token);
  }

  @Public()
  @Post('logout')
  async logout(@Body('userId') userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('company-register')
  create(@Body() dto: CreateCompanyDto) {
    return this.authService.registerCompany(dto);
  }

  @Post('employer-register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  registerEmployer(@Req() req, @Body() dto: CreateEmployerDto) {
    return this.authService.registerEmployer(+req.user.userId, dto);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  me(@Req() req) {
    return this.authService.me(+req.user.userId);
  }
}
