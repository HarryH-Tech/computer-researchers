import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IResearcher } from './researcher.interface';

export const Researcher = new Schema<IResearcher>({
  name: String,
  description: String,
  dob: String,
});

const researchers = mongoose.model('researchers', Researcher);
export default researchers;
