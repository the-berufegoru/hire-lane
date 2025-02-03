/**
 * Email queue module for managing the processing of email jobs.
 * This module creates and exports the Bull queue for sending emails.
 *
 * @module EmailQueue
 */

import Queue from "bull";
import { config } from "../configs";

/**
 * Creates a Bull queue for processing email jobs.
 * The queue is connected to the Redis server using the configuration from `config`.
 *
 * @type {Queue} A Bull queue instance used to handle email jobs.
 */
const emailQueue = new Queue("emailQueue", {
  redis: config.database?.redis?.uri ?? "redis://localhost:6379",
});

// Optional: Check if the Redis connection is valid (for example, on initialization)
emailQueue.on("error", (error) => {
  console.error("Error with email queue:", error);
});

export { emailQueue };
