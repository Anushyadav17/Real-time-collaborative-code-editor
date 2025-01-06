const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    fileName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('File', fileSchema);
