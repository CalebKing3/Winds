import config from '../../config';
import winston from 'winston';
import Sentry from 'winston-transport-sentry';
import path from 'path';

// https://github.com/guzru/winston-sentry
var transports = [new winston.transports.Console({ level: 'silly' })];

var executable = path.basename(process.argv[1]);

if (config.sentry.dsn) {
	let sentryTransport = new Sentry({
		dsn: config.sentry.dsn,
		level: 'warn',
		patchGlobal: config.env == 'production',
		tags: { key: executable },
	});
	transports.push(sentryTransport);
}

var logger = new winston.createLogger({
	format: winston.format.simple(),
	transports: transports,
});

export default logger;
