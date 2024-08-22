import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../models';
import ExtendedBaseEntity from '../base-entity';

@Entity({ name: 'notifications' })
class Notification extends ExtendedBaseEntity {
  @Column()
  type: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}

export { Notification };
