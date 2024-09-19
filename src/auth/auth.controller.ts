import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDto } from 'src/dto/user.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private serviceAuth: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginAdmin(@Body() data: AdminDto) {
    return this.serviceAuth.loginAdmin(data);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req: Request) {
    const user = req['admin']?.email;
    console.log(user);
    return this.serviceAuth.refreshTokenCall(user);
  }
}
