const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    ownerId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    projectName : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    createdAt : {
        type : String,
        required : true,
    },
})

module.exports = mongoose.model('Project', projectSchema);