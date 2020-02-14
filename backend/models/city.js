import { Schema, model } from 'mongoose';

const citySchema = Schema({
    name: String
});


export default model('City', citySchema);