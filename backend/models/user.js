import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = Schema({
    firstname: String,
    lastname: String,
    competencies: String,
    email: {type: String,required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String},
    role: String,
    file: String,
    imagePath: { type: String, required: true },
    isConnected: Boolean,
    location:{type: Schema.Types.ObjectId, ref: 'City' },
    competencies: [{type: Schema.Types.ObjectId, ref: 'Competency' }]
});

userSchema.plugin(uniqueValidator);

export default model('User',userSchema);

