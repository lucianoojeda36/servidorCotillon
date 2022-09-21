import { Cookie } from 'express-session';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, BaseEntity, PrimaryGeneratedColumn, ObjectID } from 'typeorm';

@Entity()
export class Sessions extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  cookie: Array<any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
