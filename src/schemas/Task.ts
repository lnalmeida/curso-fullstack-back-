import { model, Schema, Document } from 'mongoose';
import { UserInterface } from './User';

export enum StatusEnum {
  OPEN = 'OPEN',
  FINISHED = 'FINISHED'
}

export interface TaskInterface extends Document {
  description:string;
  status: StatusEnum;
  concluded:Date;
  responsible: UserInterface;
  createdAt:Date;
}

const TaskSchema = new Schema({
  description: {
    type: String,
    required: [true, 'O campo DESCRIÇÃO é obrigatório'],
  },
  status: {
    type: String,
    required: [true, 'O campo STATUS é obrigatório'],
    uppercase: true,
    validate: {
      validator: (value: string) => {
        if (value === StatusEnum.OPEN || value === StatusEnum.FINISHED) {
          return true;
        }
        return false;
      },
      // eslint-disable-next-line no-unused-expressions
      message: (props) => { `${props.value} não é um status válido.`; },
    },
  },
  concluded: {
    type: Date,
  },
  responsible: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'O campo RESPONSÁVEL é obrigatório'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<TaskInterface>('Task', TaskSchema);
