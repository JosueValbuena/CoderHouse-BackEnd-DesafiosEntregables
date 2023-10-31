import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    age: {type: Number},
    password: {type: String}
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;