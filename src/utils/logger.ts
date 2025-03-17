export const logger = {
  error: (message: string, error?: unknown) => {
    console.error(`[Error]: ${message}`, error);
    // Optionally send errors to an external service here
  },
  warn: (message: string) => {
    console.warn(`[Warning]: ${message}`);
  },
  debug: (message: string) => {
    console.info(`[Debug]: ${message}`);
  },
  info: (message: string) => {
    console.info(`[Info]: ${message}`);
  },
};
