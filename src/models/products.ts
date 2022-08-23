import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity()
export class Products extends BaseEntity {
  @ObjectIdColumn()
  barcode: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
