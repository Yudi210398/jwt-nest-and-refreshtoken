import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prismaSevice: PrismaService,
    private jwtservice: JwtService,
  ) {}

  async loginAdmin(data: AdminDto) {
    const admin = await this.validateUser(data);

    const payload = {
      email: admin.email,
    };

    return {
      email: admin.email,
      allToken: {
        accesToken: await this.jwtservice.signAsync(payload, {
          expiresIn: '20m',
          secret: process.env.ACCES_TOKEN,
        }),

        refreshToken: await this.jwtservice.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.REFRESH_TOKEN,
        }),
      },
    };
  }

  async validateUser(data: AdminDto) {
    const admin = await this.prismaSevice.admin.findFirst({
      where: { email: data.email },
    });

    if (admin && (await compare(data.password, admin.password))) return admin;

    throw new HttpException(
      'email atau Password Salah',
      HttpStatus.UNAUTHORIZED,
    );
  }
  async refreshTokenCall() {}
}
