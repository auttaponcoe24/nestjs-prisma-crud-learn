import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly tel: string;
}
