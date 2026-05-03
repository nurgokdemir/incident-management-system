import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum Status {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
}

@Entity('incidents')
export class Incident {
   @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  service!: string;

  @Column({ type: 'enum', enum: Severity })
  severity!: Severity;

  @Column({ type: 'enum', enum: Status, default: Status.OPEN })
  status!: Status;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

}