import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class TypeormOrder {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  customerId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('varchar', { length: 50 })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
