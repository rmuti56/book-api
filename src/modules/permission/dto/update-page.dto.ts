import { CreatePageDto } from "./create-page.dto"
import { IsUUID } from "class-validator"

export class UpdatePageDto extends CreatePageDto {
  @IsUUID()
  id: string
}