import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;
}
