import { Entity, Column, AfterLoad, getManager } from 'typeorm';
import { Group } from './group.entity';
import { Base } from 'src/common/entitys/base.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Menu extends Base {
  groups: Group[];

  @ApiHideProperty()
  @Column({ type: 'jsonb' })
  groupIds: string[];

  @Column()
  displayName: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @AfterLoad()
  async setGroups() {
    this.groups = await getManager()
    .connection.getRepository(Group)
    .findByIds(this.groupIds)
  }
}
