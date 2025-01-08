/**
 * @fileoverview Middleware configuration for the Express application.
 * @version 1.0.0
 * @module appMiddleware
 */

import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

/**
 * Configures middlewares for the Express application.
 *
 * @param {Application} app - The Express application instance.
 * @returns {void}
 */
export const configureMiddlewares = (app: Application): void => {
  app.set("trust proxy", 1);

  // Helmet configuration
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === "production" ? undefined : false,
    })
  );

  // CORS configuration
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["*"];
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging configuration
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }
};
