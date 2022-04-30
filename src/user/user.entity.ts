import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //FOREIGN KEY - RELATIONSHIP
  @Column('int', { name: 'city_id' })
  cityId: Number;

  //FOREIGN KEY - RELATIONSHIP
  @Column('int', { name: 'role_id' })
  roleId: Number;

  //TO IMPLEMENT - FOREIGN KEY FOR AUTH TABLE ('auth_id - user_id' CONNECTION)
}