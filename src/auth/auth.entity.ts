import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn({ name: 'auth_id' })
  authId: Number;

  @Column('varchar', { length: 45, name: 'email' })
  email: string;

  @Column('varchar', { length: 45, name: 'password' })
  password: string; 
}