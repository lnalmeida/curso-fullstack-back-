import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';

class App {
public app: express.Application;

public constructor() {
  this.app = express();
  this.app.use(cors());

  this.initMongoose();
  this.connectDatabase();
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

public listen(port: number): void {
  this.app.listen(port, () => {
    console.log(`Aplicação iniciada na porta: ${port}`);
  });
}
}

export default App;
