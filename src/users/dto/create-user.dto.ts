import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { UserFunction } from '../entities/user.entity';

export class CreateUserDto {
  /**
   * @example newUser
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example user@email.com
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

  /**
   * @example 55999999999
   */
  @IsString()
  @IsNotEmpty()
  phone: string;

  /**
   * @example 55999999999
   */
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  /**
   * @example Brasília
   */
  @IsString()
  @IsNotEmpty()
  city: string;

  /**
   * @example true
   */
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  /**
   * @example user
   */
  @IsEnum(UserFunction)
  @IsNotEmpty()
  function: UserFunction;
}
