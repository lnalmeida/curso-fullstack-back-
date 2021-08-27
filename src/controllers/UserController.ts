import { Request, Response, NextFunction } from 'express';

import User from '../schemas/User';
import Controller from './Controller';
import ValidationService from '../services/ValidationService';
import ServerErrorException from '../errors/ServerErrorException';
import IdInvalidException from '../errors/IdInvalidException';
import NoContentException from '../errors/NoContentException';
import HttpStatusCode from '../responses/HttpStatusCode';

class UserControler extends Controller {
  constructor() {
    super('/users');
  }

  protected initRoutes(): void {
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const users = await User.find();// eslint-disable-next-line indent
        return res.send(users);
    } catch (error) {
      // eslint-disable-next-line indent
        return res.send(new ServerErrorException(error));
    }
  }

  private async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { id } = req.params;// eslint-disable-next-line indent
        const user = await User.findById(id);// eslint-disable-next-line indent
        // eslint-disable-next-line indent
        if (!ValidationService.validateId(id)) return res.send(new IdInvalidException());
      // eslint-disable-next-line indent
        if (!user) return res.send(new NoContentException());
      // eslint-disable-next-line indent
        return res.send(user);
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        res.send(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction):Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { email } = req.body;
      // eslint-disable-next-line indent
        const userExists = await User.findOne({ email });

      // eslint-disable-next-line indent
        if (userExists) return res.status(202).send('Usuário já existente');

      // eslint-disable-next-line indent
        const user = await User.create(req.body);

      // eslint-disable-next-line indent
        return res.status(201).send('Usuário cadastrado com sucesso.');
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        return res.send(new ServerErrorException(error));
    }
  }

  private async update(req: Request, res: Response, next: NextFunction):Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { id } = req.params;

      // eslint-disable-next-line indent
        if (!ValidationService.validateId(id)) return res.send(new IdInvalidException());

      // eslint-disable-next-line indent
        const user = await User.findById(id);

      if (user) {
        // eslint-disable-next-line indent
          const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        // eslint-disable-next-line indent
          return res.send(updatedUser);
        // eslint-disable-next-line indent
        }

      // eslint-disable-next-line indent
        return res.send(new NoContentException());
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        return res.send(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      // eslint-disable-next-line indent
        const { id } = req.params;

      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        if (!ValidationService.validateId(id)) return res.send(new IdInvalidException());

      // eslint-disable-next-line indent
        const user = await User.findByIdAndDelete(id);

      // eslint-disable-next-line indent
        if (!user) return res.status(HttpStatusCode.NO_CONTENT).send(new NoContentException());

      // eslint-disable-next-line indent
        return res.status(200).send('Usuário deletado com sucesso.');
    } catch (error) {
      // eslint-disable-next-line indent
        // eslint-disable-next-line indent
        return res.send(new ServerErrorException(error));
    }
  }
}

export default UserControler;
