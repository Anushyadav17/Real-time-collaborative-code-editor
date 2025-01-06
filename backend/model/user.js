const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        required : true,
    },
    lastName : {
        type : String,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    image : {
        type : String,
    },
    projectJoined: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
})

module.exports = mongoose.model('User', userSchema);