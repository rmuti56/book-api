import { IsString, ArrayNotEmpty } from "class-validator";

export class CreatePageDto {
  @ArrayNotEmpty()
  @IsString({each: true})
  readonly groupIds: string[]

  @IsString()
  readonly url: string
}