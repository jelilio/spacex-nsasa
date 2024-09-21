#!/usr/bin/env node

import http from "http";
import webApp from "../app";
import config from "../config";
import logger from "../lib/logger";

type Error = {
  syscall: string;
  code: string;
};

const app = webApp(config);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "3000";

app.set("port", port);

/**
 * Create HTTP server and listen on the provided port
 */
const server = http.createServer(app);

server.listen(port);

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Listening on ${bind}`);
});

// Handle server errors
server.on("error", (error: Error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      logger.error(error);
    // throw error;
  }
});
