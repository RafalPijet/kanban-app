import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', isRequired: true },
  id: { type: 'String', isRequired: true, unique: true },
});

export default mongoose.model('Note', noteSchema);
