import { Auth } from 'src/auth/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: Number;

  @Column('varchar', { length: 45, name: 'first_name' })
  firstName: string;

  @Column('varchar', { length: 45, name: 'last_name' })
  lastName: string;

  @Column('varchar', { length: 45, name: 'phone_nr' })
  phoneNr: string;

  @Column('varchar', { length: 45, name: 'mothers_name', nullable: true })
  mothersName: string;

  @Column('varchar', { length: 45, name: 'ssn' })
  ssn: string;

  @Column('varchar', { length: 45, name: 'tax_nr', nullable: true })
  taxNr: string;

  @Column('varchar', { length: 45, name: 'address' })
  address: string;

  //FOREIGN KEY - RELATIONSHIP (MISSING)
  @Column('int', { name: 'city_id' })
  cityId: Number;

  //FOREIGN KEY - RELATIONSHIP (MISSING)
  @Column('int', { name: 'role_id' })
  roleId: Number;

  //RELATIONSHIP WITH EXISTING 'auth' ENTITY
  @OneToOne(type => Auth, { cascade: true, onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'auth_id' })
  auth: Auth;
  //FOREIGN KEY COLUMN 'auth_id'
  @Column('int', { name: 'auth_id' })
  authId: Number;
}