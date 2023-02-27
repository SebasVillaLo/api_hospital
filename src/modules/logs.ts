import * as winston from 'winston';
import _ from 'lodash';
//@ts-ignore
import DailyRotateFile = require("winston-daily-rotate-file");
import appRoot from 'app-root-path';

/**
 * load a view of a json in the terminal
 */
//@ts-ignore
const logStackAndOmitIt = winston.format((info, opts) => {
  if (info.stack) {
    return _.omit(info, 'stack', 'level');
  }
  return info;
});

/** winston library configuration for handling isa logs */

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.colorize(),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm'}),
    winston.format.printf((info) => {
      let level = info.level;
      if (info.level === '[31merror[39m') level = '❌ ' + info.level;
      if (info.level === '[32minfo[39m') level = '✅ ' + info.level;
      return `${level}: [${info.timestamp}] ${info.message}`
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: `${appRoot}/logs/log-WepApi-%DATE%.log`,
      dirname: `${appRoot}/logs/`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '5',
    }),
    new winston.transports.Console({
      level: 'info'
    }),
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        logStackAndOmitIt(),
        winston.format.prettyPrint(),
      )
    }),
  ]
});

export default logger;