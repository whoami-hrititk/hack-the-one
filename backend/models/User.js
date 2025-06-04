const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true, trim: true},
    email:{type: String, require: true, unique: true, trim:true},
    hashPass:{type: String, require: true},
    registeredAt:{type:Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);
module.exports = User;