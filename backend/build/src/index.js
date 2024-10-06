"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./lib/logger"));
// const app = webApp(config);
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "3000";
app_1.default.set("port", port);
/**
 * Create HTTP server and listen on the provided port
 */
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    logger_1.default.info(`Listening on ${bind}`);
});
// Handle server errors
server.on("error", (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger_1.default.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case "EADDRINUSE":
            logger_1.default.error(`${bind} is already in use`);
            process.exit(1);
        default:
            logger_1.default.error(error);
    }
});
