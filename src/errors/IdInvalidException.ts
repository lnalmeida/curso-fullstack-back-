import HttpStatusCode from '../responses/HttpStatusCode';
import HttpExceptions from './HttpExceptions';

class IdInvalidException extends HttpExceptions {
  constructor() {
    super(HttpStatusCode.BAD_REQUEST, 'Id inválido, favor verificar');
  }
}
export default IdInvalidException;
