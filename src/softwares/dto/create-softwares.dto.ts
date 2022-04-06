import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSoftwaresDto {
  /**
   * @example notion
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * @example github.com
   */
  @IsString()
  @IsNotEmpty()
  link: string;

  /**
   * @example This is a description
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * @example organitzation, helper
   */
  @IsString()
  @IsNotEmpty()
  tags: string[];
}
