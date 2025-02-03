/**
 * Email processing module for sending email notifications.
 * This module processes jobs from the emailQueue and sends emails using the notificationUtil.
 *
 * @module EmailProcessing
 */

import { emailQueue } from "../queues";
import { Job } from "bull";
import { logger, notificationUtil } from "../utils";

/**
 * Processes email jobs from the queue to send emails.
 * Each job contains the email address, subject, and body of the email to be sent.
 *
 * @param {Job<{ email: string; subject: string; body: string }>} job - The email job that contains the email details.
 * @returns {void}
 */
emailQueue.process(
  async (job: Job<{ email: string; subject: string; body: string }>) => {
    try {
      const { email, subject, body } = job.data;

      /**
       * Callback function for sending the email.
       * Logs success or failure based on whether the email was sent successfully.
       *
       * @param {Error | null} error - Error if the email sending failed.
       * @returns {void}
       */
      const sendEmailCallback = (error: Error | null) => {
        if (error) {
          logger.error(
            `Failed to send email to ${email} with subject "${subject}"`,
            error
          );
        } else {
          logger.info(
            `Email successfully sent to ${email} with subject "${subject}"`
          );
        }
      };

      // Sending the email via the notificationUtil
      notificationUtil.sendEmail(email, subject, body, sendEmailCallback);
    } catch (error) {
      logger.error("Error processing email job:", error);
    }
  }
);
