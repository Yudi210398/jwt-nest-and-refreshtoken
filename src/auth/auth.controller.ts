import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private serviceAuth: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginAdmin(@Body() data: AdminDto) {
    return this.serviceAuth.loginAdmin(data);
  }
}
