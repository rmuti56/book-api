import { Scope } from "src/common/enums/scope.enum";

export interface ICurrentUser{
    id: string
    scopes: Scope[]
}