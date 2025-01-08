import { IDatabaseConfig } from "./";
import { ILoggerConfig } from "./";

/**
 * Interface representing the configuration settings.
 */
export interface IConfig {
  /**
   * Database configuration settings.
   */
  database: IDatabaseConfig;
  /**
   * Logger configuration settings.
   */
  logger: ILoggerConfig;
}
