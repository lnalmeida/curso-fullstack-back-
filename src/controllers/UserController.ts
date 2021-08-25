import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import User from '../schemas/User';
import Controller from './Controller';

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
    const users = await User.find();

    return res.send(users);
  }

  private async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).send('Id inválido');

    const user = await User.findById(id);

    return res.send(user);
  }

  private async create(req: Request, res: Response, next: NextFunction):Promise<Response> {
    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(204).send('Usuário já existente');

    const user = await User.create(req.body);

    return res.status(201).send('Usuário cadastrado com sucesso.');
  }

  private async update(req: Request, res: Response, next: NextFunction):Promise<Response> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).send('Id inválido');

    const user = await User.findById(id);

    if (user) {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

      return res.send(updatedUser);
    }

    return res.status(204).send('Usuário não encontrado');
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).send('Id inválido');

    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(204).send('Usuário não encontrado');

    return res.send('Usuário deletado com sucesso.');
  }
}

export default UserControler;
