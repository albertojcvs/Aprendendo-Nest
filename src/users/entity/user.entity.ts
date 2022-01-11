import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterUpdate,
} from 'typeorm';

const bcrypt = require('bcrypt');

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;
  
  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  @Field()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @AfterUpdate()
  public async hashPassword() {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    if (this.password)
      this.password = await bcrypt.hash(this.password, salt);
  }
}
