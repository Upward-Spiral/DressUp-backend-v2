import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './user'

export interface IItem extends Document {
  title: string;
  image: string;
  material: string;
  brand: string;
  owner: IUser['_id'];
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  material: { type: String, enum: ['Mocha', 'Leather', 'Cotton']},
  brand: { type: String, enum: ['YSL', 'Gucci', 'Louis Vuitton']},
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
})

export default mongoose.model<IItem>('Item', ItemSchema)