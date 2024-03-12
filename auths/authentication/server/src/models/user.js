// backend/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    isConfirmed: { type: Boolean, default: false },
    token: { type: String },
    tokenActivation: { type: String },
    tokenExpiration:{ type: Date },
});
const User = mongoose.model("user", userSchema);


module.exports = {
    User,
};
