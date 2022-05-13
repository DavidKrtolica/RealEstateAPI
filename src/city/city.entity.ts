import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn({ name: 'city_id' })
  cityId: number;

  @Column('varchar', { length: 45, name: 'city_name' })
  cityName: string;

  @Column('int', {  name: 'city_code' })
  cityCode: number; 
}