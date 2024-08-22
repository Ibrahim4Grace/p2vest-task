import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, Comment, Tag } from '../models';
import ExtendedBaseEntity from '../base-entity';

enum TaskStatus {
  TODO = 'To-Do',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

@Entity({ name: 'tasks' })
class Task extends ExtendedBaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  due_date: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  assigned_to: User;

  @ManyToOne(() => User, (user) => user.created_tasks)
  created_by: User;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  @JoinTable({ name: 'task_tags' })
  tags: Tag[];
}

export { Task, TaskStatus };
