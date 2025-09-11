import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/req/register.req';
import { LoginDto } from './dto/req/login.req';
import { RefreshTokenDto } from './dto/req/refresh-token.req';
import { Public } from './decorators/public.decorator';
import { CreateCompanyDto } from './dto/req/company-register.req';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

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
  async refreshToken(@Body() dto: RefreshTokenDto) {
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

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  me(@Req() req) {
    return this.authService.me(+req.user.userId);
  }
}
