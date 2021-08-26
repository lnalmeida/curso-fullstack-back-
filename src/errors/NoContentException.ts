import HttpStatusCode from '../responses/HttpStatusCode';
import HttpExceptions from './HttpExceptions';

class NoContentExceptions extends HttpExceptions {
  constructor() {
    super(HttpStatusCode.NOT_FOUND, 'Registro não encontrado, favor verificar');
  }
}
export default NoContentExceptions;
