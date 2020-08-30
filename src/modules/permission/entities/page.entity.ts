import { Entity, Column } from "typeorm";
import { Base } from "src/common/entitys/base.entity";
import { Group } from "./group.entity";

@Entity()
export class Page extends Base {
  groups: Group[];
  
  @Column({type:'jsonb'})
  groupIds: string[]

  @Column()
  url: string;
}