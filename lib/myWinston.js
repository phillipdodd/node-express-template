const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, colorize, json, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

function createLoggerFor(labelName) {
    return createLogger({
        //? Leaving this on the top level in case I define more File transports in the future
        format: combine(
            json(),
            label({ label: labelName }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        transports: [
            new transports.File({
                level: 'debug',
                filename: `./logs/${new Date().toLocaleDateString().replace(/\//g,"-")}.log`,
                handleExceptions: 'false',
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true,
                format: combine(
                    colorize(),
                    label({ label: labelName }),
                    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    myFormat
                )
            })
        ],
        exitOnError: false
    })
}

module.exports = createLoggerFor;
