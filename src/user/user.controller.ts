import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDto } from 'src/dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private serviceUser: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUSer(@Body() data: AdminDto) {
    return this.serviceUser.createAdmin(data);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAdmin(@Req() req: Request) {
    const user = req['admin']?.email;
    return this.serviceUser.getAdmin();
  }
}
