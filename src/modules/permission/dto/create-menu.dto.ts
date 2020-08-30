import { IsString } from 'class-validator';

export class CreateMenuDto {

  @IsString({each: true})
  readonly  groupIds: string[];

  @IsString()
  readonly displayName: string;

  @IsString()
  readonly icon: string;

  @IsString()
  readonly url: string;
}
