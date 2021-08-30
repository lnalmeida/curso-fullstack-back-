import { Request, Response, NextFunction } from 'express';

import responseRunTimeError from '../responses/ResponseRunTimeError';
import HttpExceptions from '../errors/HttpExceptions';
import HttpStatusCode from '../responses/HttpStatusCode';

function runTimeErrorMiddleware(error: HttpExceptions, req: Request, res: Response, next: NextFunction) {
  const status = error.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Erro desconhecido no Servidor';

  responseRunTimeError(res, status, message);
}

export default runTimeErrorMiddleware;
