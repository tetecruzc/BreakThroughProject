import pkg from 'winston';
const { createLogger, format, transports} = pkg;

export default createLogger({
    format: format.combine(
        format.colorize({ all: true }),
        format.simple(),
        format.timestamp(),
        format.align(),
        format.printf(info => `[${info.timestamp}] - ${info.level} - ${info.message}`),
    ),
    transports:[
        new transports.Console({
            level: 'debug',
            colorize: true
        })
    ],  
})
