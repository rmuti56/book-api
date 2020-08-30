import { Entity, Column, AfterLoad, getManager } from 'typeorm';
import { Base } from 'src/common/entitys/base.entity';
import { Group } from './group.entity';

@Entity()
export class Page extends Base {
  groups: Group[];

  @Column({ type: 'jsonb' })
  groupIds: string[];

  @Column()
  url: string;

  @AfterLoad()
  async setGroups() {
    this.groups = await getManager()
      .connection.getRepository(Group)
      .findByIds(this.groupIds);
  }
}
