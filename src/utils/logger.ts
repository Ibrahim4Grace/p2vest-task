import pino from 'pino';
import dayjs from 'dayjs';

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Enables colorized output
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
