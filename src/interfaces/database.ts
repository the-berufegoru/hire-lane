/**
 * Interface representing the configuration for PostgreSQL database.
 */
interface IPostgresConfig {
  /** The name of the PostgreSQL database */
  databaseName: string;
  /** The username for accessing the PostgreSQL database */
  username: string;
  /** The password for accessing the PostgreSQL database */
  password: string;
  /** The host address of the PostgreSQL database */
  host: string;
}

/**
 * Interface representing the configuration for Redis.
 */
interface IRedisConfig {
  /** The URI for connecting to the Redis instance */
  uri: string;
}

/**
 * Interface representing the overall database configuration.
 */
export interface IDatabaseConfig {
  /** Configuration for PostgreSQL database */
  postgres: IPostgresConfig;
  /** Configuration for Redis */
  redis: IRedisConfig;
}
