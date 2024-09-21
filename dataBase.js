const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const User = new Schema({
    email: {type: String, unique: true},
    name: String,
    password: String
});

const Todo = new Schema({
    task: String,
    done: Boolean,
    userId: ObjectId
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

//exporting models
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
};