import logger from "./loggerConfig";

export async function loggerRequest({
  method,
  action,
  url,
  body,
  params,
}: any) {
  logger.log({
    logger: "disciplina-logger",
    level: "info",
    action: action,
    method: method,
    url: url,
    body: body ? body : [],
    params: params ? params : "Sem parâmetros",
  });
}

export async function loggerResponse({ action, method, url, response }: any) {
  logger.log({
    logger: "disciplina-logger",
    level: "info",
    action: action,
    method: method,
    url: url,
    response: response ? response : {},
  });
}

export async function loggerBeforeReturn({ message }: any) {
  logger.log({
    message: message,
  });
}

export default { loggerRequest, loggerResponse, loggerBeforeReturn };
