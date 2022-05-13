import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn({ name: 'auth_id' })
  authId: number;

  @Column('varchar', { length: 45, name: 'email' })
  email: string;

  @Column('varchar', { length: 45, name: 'password' })
  password: string; 
}