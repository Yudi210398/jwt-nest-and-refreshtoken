import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private serviceUser: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUSer(@Body() data: AdminDto) {
    console.log(data?.email, data?.password, `wkwk`);
    return this.serviceUser.createAdmin(data);
  }
}
