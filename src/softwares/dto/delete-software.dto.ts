import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteSoftwareDto {
  /**
   * @example "84985d78-6510-4586-ae48-3c234026d1dd"
   */
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
