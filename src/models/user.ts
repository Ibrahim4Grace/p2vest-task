import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Task, Comment, Notification } from '../models';
import { IsEmail } from 'class-validator';
import { getIsInvalidMessage } from '../utils';
import ExtendedBaseEntity from '../base-entity';

enum UserRole {
  SUPER_ADMIN = 'super_admin',
  USER = 'user',
}

@Entity({ name: 'users' })
class User extends ExtendedBaseEntity {
  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  @IsEmail(undefined, { message: getIsInvalidMessage('Email') })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Task, (task) => task.assigned_to)
  tasks: Task[];

  @OneToMany(() => Task, (task) => task.created_by)
  created_tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Column({
    type: 'varchar',
    array: true,
    default: [UserRole.USER],
  })
  role: UserRole[];
}

export { User, UserRole };
