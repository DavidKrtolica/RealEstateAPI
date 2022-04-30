import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  //ALSO A FOREIGN KEY AND PRIMARY KEY - EXACTLY THE SAME AS THE USER ID
  @PrimaryGeneratedColumn({ name: 'auth_id' })
  authId: Number
  
  /* //RELATIONSHIP DEFINED
  @OneToOne(() => User) 
  @JoinColumn()
  user: User; */

  @Column('varchar', { length: 45, name: 'email' })
  email: string;

  @Column('varchar', { length: 45, name: 'password' })
  password: string; 
}