import { ConflictException, Injectable } from '@nestjs/common';
import { AdminDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createAdmin(data: AdminDto) {
    console.log(data.email, data.password);
    const adminAlready = await this.prismaService.admin.count();

    if (adminAlready > 0)
      throw new ConflictException(
        'Admin sudah ada, tidak bisa membuat admin baru',
      );

    const addData = await this.prismaService.admin.create({
      data: { email: data.email, password: await hash(data.password, 10) },
    });

    const { password, ...result } = addData;
    return {
      result,
      message: 'Sukses',
    };
  }
}
