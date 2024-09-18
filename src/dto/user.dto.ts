import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Ini bukan format email' })
  email: string;

  @IsNotEmpty({ message: 'Password gk boleh kosong' })
  password: string;
}
