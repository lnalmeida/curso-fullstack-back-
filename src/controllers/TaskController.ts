import { Request, Response, NextFunction } from 'express';

import Task, { TaskInterface } from '../schemas/Task';
import Controller from './Controller';
import ValidationService from '../services/ValidationService';
import ServerErrorException from '../errors/ServerErrorException';
import NoContentException from '../errors/NoContentException';
import HttpStatusCode from '../responses/HttpStatusCode';
import responseCreate from '../responses/ResponseCreate';
import responseOk from '../responses/ResponseOk';
import TaskService from '../services/TaskService';

class TaskController extends Controller {
  constructor() {
    super('/tasks');
  }

  protected initRoutes(): void {
    this.router.get(`${this.path}/:filter/:_id`, this.list);
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const tasks = await Task.find(TaskService.getParams(req)).populate('responsible');// eslint-disable-next-line indent
        // eslint-disable-next-line indent
        if (tasks.length) return responseOk(res, tasks);
      // eslint-disable-next-line indent
        next(new NoContentException());
    } catch (error) {
      // eslint-disable-next-line indent
        next(new ServerErrorException(error));
    }
  }

  private async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { id } = req.params;// eslint-disable-next-line indent
        // eslint-disable-next-line indent
        if (ValidationService.validateId(id, next)) return;
      // eslint-disable-next-line indent
        const task = await Task.findById(id);// eslint-disable-next-line indent
        // eslint-disable-next-line indent
        if (task) return responseOk(res, task);
      // eslint-disable-next-line indent
        next(new NoContentException());
      // eslint-disable-next-line indent
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        next(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction):Promise<Response> {
    try {
      // eslint-disable-next-line indent
        let task: TaskInterface = req.body;
      // eslint-disable-next-line indent
        TaskService.checkStatusFinished(task);
      // eslint-disable-next-line indent
        task = await Task.create(task);// eslint-disable-next
      // eslint-disable-next-line indent
        task = await Task.findById(task.id).populate('responsible');
      // eslint-disable-next-line indent
        return responseCreate(res, task);
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        next(new ServerErrorException(error));
    }
  }

  private async update(req: Request, res: Response, next: NextFunction):Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { id } = req.params;
      // eslint-disable-next-line indent
        if (ValidationService.validateId(id, next)) return;

      // eslint-disable-next-line indent
        let task: TaskInterface = req.body;
      // eslint-disable-next-line indent
        TaskService.checkStatusFinished(task);

      // eslint-disable-next-line indent
        task = await Task.findByIdAndUpdate(id, task, { new: true });

      if (task) {
        // eslint-disable-next-line indent
          task = await Task.findById(id).populate('responsible');
        // eslint-disable-next-line indent
          return responseOk(res, task);
      }

      // eslint-disable-next-line indent
        next(new NoContentException());
    } catch (error) {
      // eslint-disable-next-line indent
        next(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { id } = req.params;
      // eslint-disable-next-line indent
        if (ValidationService.validateId(id, next)) return;
      // eslint-disable-next-line indent
        const task = await Task.findByIdAndDelete(id);
      // eslint-disable-next-line indent
        if (!task) return res.status(HttpStatusCode.NO_CONTENT).send(new NoContentException());
      // eslint-disable-next-line indent
        return responseOk(res, task);
      // return res.status(200).send('Usuário deletado com sucesso.');
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        return res.send(new ServerErrorException(error));
    }
  }
}

export default TaskController;
