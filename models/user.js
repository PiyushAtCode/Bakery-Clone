const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ✅ Correct
const passportLocalMongoose = require("passport-local-mongoose").default;


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose); // username, password fields add karega

module.exports = mongoose.model('User', UserSchema);

