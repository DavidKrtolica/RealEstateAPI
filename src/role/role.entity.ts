import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  roleId: number;

  @Column('varchar', { length: 45, name: 'role' })
  role: string 
}