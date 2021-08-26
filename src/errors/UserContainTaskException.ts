import HttpStatusCode from '../responses/HttpStatusCode';
import HttpExceptions from './HttpExceptions';

class UserContainTaskException extends HttpExceptions {
  constructor() {
    super(HttpStatusCode.CONFLICT, 'Impossível excluir, o usuário possui tarefas relacionadas');
  }
}
export default UserContainTaskException;
