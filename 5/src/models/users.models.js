import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: String, required: true},
    password: {type: String, required: true}
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;