import HttpStatusCode from '../responses/HttpStatusCode';
import HttpExceptions from './HttpExceptions';

class NoContentExceptions extends HttpExceptions {
  constructor() {
    super(HttpStatusCode.NO_CONTENT, 'Registro não encontrado, favor verificar');
  }
}
export default NoContentExceptions;
