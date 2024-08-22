import { Entity, Column, ManyToOne } from 'typeorm';
import { Task, User } from '../models';
import ExtendedBaseEntity from '../base-entity';

@Entity({ name: 'comments' })
class Comment extends ExtendedBaseEntity {
  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}

export { Comment };
