import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum UserFunction {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'users' })
@Unique(['phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: Object.values(UserFunction),
    default: UserFunction.USER,
  })
  function: UserFunction;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
