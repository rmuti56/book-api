import { Base } from 'src/common/entitys/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Book extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', default: 0 })
  totalRead: number;

  @Column({ type: 'int', default: 0 })
  totalLike: number;

  @Column({ type: 'int', default: 0 })
  totalVote: number;

  @Column({ type: 'int', default: 0 })
  totalPoint: number;

  @Column({ type: 'float',nullable:true })
  rating?: number;

  @Column({nullable: true})
  imageUrl?: string;

  
}
