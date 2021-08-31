import { Request, Response, NextFunction } from 'express';

import Controller from './Controller';
import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import responseOk from '../responses/ResponseOk';
import Task from '../schemas/Task';

class UserControler extends Controller {
  constructor() {
    super('/dash');
  }

  protected initRoutes(): void {
    this.router.get(this.path, this.list);
  }

  private async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const tasks = await Task.find({}, '-_id -__v -concluded -description -createdAt').populate('responsible', 'name');
      // eslint-disable-next-line indent
        if (tasks.length) return responseOk(res, tasks);
      // eslint-disable-next-line indent
        next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}

export default UserControler;
