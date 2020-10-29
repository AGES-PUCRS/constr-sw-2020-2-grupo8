const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, splat } = format;

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint(), splat()),
  defaultMeta: { controller: "disciplina-controller" },
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "info.log", level: "info" }),
  ],
});

export default logger;
