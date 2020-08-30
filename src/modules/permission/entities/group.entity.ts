import { Entity, Column } from "typeorm";
import { Base } from "src/common/entitys/base.entity";
import { Scope } from "src/common/enums/scope.enum";

@Entity()
export class Group extends Base {
  @Column({ unique: true })
  name: string
  
  @Column()
  permissions: Scope
}
