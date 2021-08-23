import { model, Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
  name:string;
  email:string;
  password:string;
  createdAt:Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'O campo NOME é obrigatório'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'O campo EMAIL é obrigatório'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'O campo PASSWORD é obrigatório'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<UserInterface>('User', UserSchema);
