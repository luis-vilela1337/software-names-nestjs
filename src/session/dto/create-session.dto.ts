import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  /**
   * @example admin@email.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * @example 12345
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
