import { Entity, Column, ManyToMany } from 'typeorm';
import { Task } from '../models';
import ExtendedBaseEntity from '../base-entity';

@Entity({ name: 'tags' })
class Tag extends ExtendedBaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[];
}

export { Tag };
