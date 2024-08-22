import { Notification, User } from '../models';
import AppDataSource from '../data-source';

class NotificationService {
  private notificationRepository = AppDataSource.getRepository(Notification);
  private userRepository = AppDataSource.getRepository(User);

  async createNotification(
    userId: string,
    type: string,
    content: string
  ): Promise<Notification> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const notification = this.notificationRepository.create({
      user,
      type,
      content,
    });
    return this.notificationRepository.save(notification);
  }
}

export default new NotificationService();
