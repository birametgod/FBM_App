import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = Schema({
    email: {type: String,required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String},
    role: String,
    file: String,
    picture: String,
    isConnected: Boolean,
    location:String,
});

userSchema.plugin(uniqueValidator);

export default model('User',userSchema);

