import { User } from '../models';
import { UserResponsePayload } from '../types';
const sendUser = (user: User): UserResponsePayload => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  };
};

// const sendSettings = (settings: Settings): UserSettingsResponsePayload => {
//   return {
//     ai_interaction_preference: settings.ai_interaction_preference,
//     revision_quiz_preference: settings.revision_quiz_preference,
//     homework_schedule_preference: settings.homework_schedule_preference,
//     activity_report_frequency_preference:
//       settings.activity_report_frequency_preference,
//     ai_assistance_level_preference: settings.ai_assistance_level_preference,
//     data_privacy_preference: settings.data_privacy_preference,
//     access_control: settings.access_control,
//     push_notifications_for_homework: settings.push_notifications_for_homework,
//     generated_question_reminder: settings.generated_question_reminder,
//     ungraded_assignment_reminder: settings.graded_assignment_reminder,
//     graded_assignment_reminder: settings.graded_assignment_reminder,
//     ai_generated_feedback: settings.generated_question_reminder,
//     ai_grading_session: settings.ai_grading_session,
//     email_notifications: settings.email_notifications,
//     push_notifications: settings.push_notifications,
//     promotional_emails: settings.promotional_emails,
//   };
// };

export { sendUser };
