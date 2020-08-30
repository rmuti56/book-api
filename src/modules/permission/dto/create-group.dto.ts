import { IsString, IsEnum } from "class-validator"
import { Scope } from "src/common/enums/scope.enum"

export class CreateGroupDto{
    @IsString()
    name: string
    
    @IsEnum(Scope)
    permission: Scope
}