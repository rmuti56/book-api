import { IsString, IsEnum } from "class-validator"
import { Scope } from "src/common/enums/scope.enum"

export class CreateGroupDto{
    @IsString()
    readonly name: string
    
    @IsEnum(Scope)
    readonly permission: Scope
}