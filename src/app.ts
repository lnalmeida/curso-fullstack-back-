import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import Controller from './controllers/Controller';
import notFoundErrorMiddleware from './middlewares/NotFoundErrorMiddleware';
import runTimeErrorMiddleware from './middlewares/RunTimeErrorMiddleware';

class App {
public app: express.Application;

public constructor(controllers: Controller[]) {
  this.app = express();
  this.app.use(cors());

  this.initMongoose();
  this.connectDatabase();
  this.initExpressJSON();
  this.initControllers(controllers);
  this.initNotFoundErrorMiddleware();
  this.initRunTimeErrorMiddleware();
}

public initMongoose():void {
  mongoose.set('runValidators', true);
}

public connectDatabase():void {
  mongoose.connect('mongodb+srv://sc-admin:gsJ24BNpSUat6lqN@study-cluster.svi6a.mongodb.net/curso-full-stack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log('Mongoose connected');
}

private initExpressJSON():void {
  this.app.use(express.json());
}

private initControllers(controllers: Controller[]):void {
  controllers.forEach((controller) => {
    this.app.use('/', controller.router);
  });
}

private initNotFoundErrorMiddleware():void {
  this.app.all('*', notFoundErrorMiddleware);
}

private initRunTimeErrorMiddleware():void {
  this.app.use(runTimeErrorMiddleware);
}

public listen(port: number): void {
  this.app.listen(port, () => {
    console.log(`Aplicação iniciada na porta: ${port}`);
  });
}
}

export default App;
