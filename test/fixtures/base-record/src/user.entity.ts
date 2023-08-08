import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test_user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;
}
