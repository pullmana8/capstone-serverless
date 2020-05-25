import * as winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'

export function createLogger(loggerName: string) {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { name: loggerName },
    transports: [new winston.transports.Console()],
  })
}

winston.add(
  new Loggly({
    token: '0d93e78f-1b9d-4006-a631-439d10cac5a8',
    subdomain: 'caldtech',
    tags: ['Winston-NodeJS'],
    json: true,
  }),
)

winston.log('info', 'Hello World from Node.js!')
