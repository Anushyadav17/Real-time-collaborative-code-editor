const File = require("../model/File");
const Project = require("../model/Project");

exports.createFile = async(req, res) => {
    try {
        const {projectId, fileName, content} = req.body;

        if(!projectId || !fileName) {
            return res.status(404).json({
                success: false,
                message: "All fields are required!",
            })
        }

        //find project details
        const projectDetails = await Project.findById({_id: projectId});
        if(!projectDetails) {
            return res.status(404).json({
                success : false,
                message : "Project is Not Found!",
            })
        }

        const fileDetails = await File.create({
            projectId,
            fileName, 
            content: "",
            createdAt: Date.now()
        });

        return res.status(200).json({
            success: true,
            message: "File created successfully..",
            data: fileDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurs while creating a file!"
        })
    }
}

exports.getProjectFiles = async(req, res) => {
    try {
        const {projectId} = req.body;

        if(!projectId) {
            return res.status(404).json({
                success: false,
                message: "Project id is required!",
            })
        }
        
        //find project details
        const projectDetails = await Project.findById({_id: projectId});
        if(!projectDetails) {
            return res.status(404).json({
                success : false,
                message : "Project is Not Found!",
            })
        }

        const Files = await File.find({projectId});

        return res.status(200).json({
            success: true,
            message: "Files retrives successfully.",
            data: Files
        })

    } catch (error) {
        //console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occurs while fetching the files!"
        })
    }
}

exports.updateFile = async(req, res) => {
    try {
        const {fileId, content} = req.body;

        if(!fileId || !content) {
            return res.status(404).json({
                success: false,
                message: "All fields are required!",
            })
        }

        const updateFileContent = await File.findByIdAndUpdate(
            {_id: fileId},
            {content: content},
            {new: true},
        )

        if(!updateFileContent) {
            return res.status(404).json({
                success: false,
                message: "No such file found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "File saved successfully.",
            data: updateFileContent,
        })
    } catch (error) {
        return res.status(500).status({
            success: false,
            message: "Error occurs while updating a file!"
        })
    }
}

exports.deleteFile = async(req, res) => {
    try {
        const {fileId} = req.body;

        if(!fileId) {
            return res.status(404).json({
                success: false,
                message: "File id not found!"
            })
        }

        await File.findByIdAndDelete(fileId);

        return res.status(200).json({
            success: true,
            message: "File deleted successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurs while deleting a file!"
        })
    }
}