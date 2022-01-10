import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

const bcrypt = require('bcrypt')

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const myPlaintextPassword = 's0//P4$$w0rD';
    if (this.password)
      this.password = await bcrypt.hash(myPlaintextPassword, salt);

       
  
    }
 


  
}
