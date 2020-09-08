import { IsString, ArrayNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @ArrayNotEmpty()
  @IsString({each: true})
  readonly  groupIds: string[];

  @IsString()
  readonly displayName: string;

  @IsString()
  readonly icon: string;

  @IsString()
  readonly url: string;
}
