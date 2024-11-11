import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  // async login(@Request() req) {
  //   const result = await this.authService.login(req.user);
  //   return result;
  // }
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.login(req.user);
    // save to cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return {
      message: 'Login success',
    };
  }
}
