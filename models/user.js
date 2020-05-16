const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, max: 1024, min: 8 },
})

const UserModel = mongoose.model("Design45_User", userSchema);

module.exports = UserModel;

