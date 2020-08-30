import { Entity, Column, AfterLoad,EntityManager } from "typeorm";
import { Group } from "./group.entity";
import { Base } from "src/common/entitys/base.entity";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity()
export class Menu extends Base {
  constructor(
    private entityManager : EntityManager
  ){
    super()
  }

  groups: Group[];
  
  @ApiHideProperty()
  @Column({type:'jsonb'})
  groupIds: string[]

  @Column()
  displayName: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @AfterLoad()
  async setGroups(){
    this.groups = await this.entityManager.findByIds(Group,this.groupIds)
  }



}