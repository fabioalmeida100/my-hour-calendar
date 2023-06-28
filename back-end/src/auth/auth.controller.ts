import { Controller, Res, Req, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/middleware/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() payload, @Res() response) {
    try {
      const { username, password } = payload;
       this.authService.login(username, password);
       const token = this.authService.login(username, password);
       response.status(200).send(token);

    } catch (error) {
       response.status(401).send(error.message);
    }
  }

  @Post('validate-token')
  @UseGuards(JwtAuthGuard)
  validateToken(@Req() request: any) {
    return request.user;
  }
}
