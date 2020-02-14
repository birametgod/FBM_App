import { Schema, model } from 'mongoose';

const competencySchema = Schema({
    name: String
});


export default model('Competency', competencySchema);