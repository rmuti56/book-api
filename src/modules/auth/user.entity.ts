import { Base } from 'src/common/entitys/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';

import { Scope } from 'src/common/enums/scope.enum';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  username: string;

  @ApiHideProperty()
  @Column({ select: false })
  password: string;

  @ApiHideProperty()
  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  salt: string;

  @Column({ type: 'jsonb' })
  scopes: Scope[];

  async validatePassword(passowrd: string): Promise<boolean> {
    const hashPassword = await hash(passowrd, this.salt);
    return hashPassword === this.password;
  }
}
