import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './user'
import { IItem } from './item'


export interface IOutfit extends Document {
  title: string;
  image: string;
  occasion: string;
  description: string;
  shared: boolean;
  items: IItem['_id'];
  owner: IUser['_id'];
  liked_by: IUser['_id'];
}

const OutfitSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  occasion: { type: String, enum: ['Party', 'Work', 'Dinner', 'Funeral', 'Date', 'Workout',]},
  description: {type: String},
  shared: {type: Boolean},
  items: { type: Schema.Types.ObjectId, ref: 'Item'},
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  liked_by: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model<IOutfit>('Outfit', OutfitSchema)