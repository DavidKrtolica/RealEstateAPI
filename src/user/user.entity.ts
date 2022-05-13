import { Auth } from 'src/auth/auth.entity';
import { City } from 'src/city/city.entity';
import { Role } from 'src/role/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

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

  //RELATIONSHIP WITH 'city' ENTITY -- MANY TO ONE, AS
  //ONE CITY CAN BELONG TO MUTIPLE USERS
  @ManyToOne(type => City)
  @JoinColumn({ name: 'city_id' })
  city: City;
  //FOREIGN KEY COLUMN 'city_id'
  @Column('int', { name: 'city_id' })
  cityId: number;

  //RELATIONSHIP WITH 'role' ENTITY -- MANY TO ONE, AS
  //ONE ROLE CAN BELONG TO MUTIPLE USERS
  @ManyToOne(type => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
  //FOREIGN KEY COLUMN 'role_id'
  @Column('int', { name: 'role_id' })
  roleId: number;

  //RELATIONSHIP WITH EXISTING 'auth' ENTITY -- ONE TO ONE, AS
  //ONE USER CAN ONLY BE CONNECTED TO ONE AUTH 
  @OneToOne(type => Auth, { cascade: true, onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'auth_id' })
  auth: Auth;
  //FOREIGN KEY COLUMN 'auth_id'
  @Column('int', { name: 'auth_id' })
  authId: number;
}