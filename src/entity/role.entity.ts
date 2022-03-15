import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  role: string;
}
