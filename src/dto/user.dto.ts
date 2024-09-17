import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Ini bukan format email' })
  email: string;

  @IsNotEmpty()
  password: string;
}
