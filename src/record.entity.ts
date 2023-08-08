import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test_record')
export class RecordEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'msg_text' })
  text?: string;
}
