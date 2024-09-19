import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private serviceUser: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAdmin(@Req() req: Request) {
    const user = req['admin']?.email;

    return this.serviceUser.getAdmin();
  }
}
