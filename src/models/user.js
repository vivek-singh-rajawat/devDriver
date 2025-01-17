const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["male","female","other"]
    },
    photoUrl: {
        type: String,
        default: "https://elitebusinessmagazine.co.uk/wp-content/uploads/2020/06/Anonymous-Male-Writer-EliteBusinessMagazine-3.jpg"
    },
    about: {
        type: String,
        default: "Hey there! I am using this app"
    },
    SKills: {
        type: Array
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);

