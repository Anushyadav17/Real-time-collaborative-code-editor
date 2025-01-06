const Project = require('../model/Project');
const User = require("../model/user");
const File = require("../model/File")
const jwt = require("jsonwebtoken")

exports.createProject = async(req, res) => {
    try {
        const {userId, projectName, description} = req.body;

        if(!userId || !projectName || !description) {
            return res.status(404).json({
                success : false,
                message : "All Fields are Required",
            })
        }

        const user = await User.findById({_id : userId});
        if(!user) {
            return res.status(404).json({
                success : false,
                message : "User Not Found",
            })
        }

        const projectDetails = await Project.create({
            ownerId : userId,
            projectName,
            description,
            createdAt : Date.now(),
        })

        await File.create({
            projectId: projectDetails._id,
            fileName: "Default File",
            content: "",
            createdAt: Date.now(), // Fixing typo
        });

        const accessToken = jwt.sign(
            { userId, projectId: projectDetails._id },
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        );        

        return res.status(200).json({
            success : true,
            message : "Project Created Successfully",
            data: projectDetails,
            accessToken: accessToken,
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.getProjectDetails = async(req, res) => {
    try {
        const {projectId} = req.body;

        if(!projectId) {
            return res.status(404).json({
                success : false,
                message : "ProjectId Not Found",
            })
        }

        const projectDetails = await Project.find({_id : projectId}).populate("ownerId").exec();

        if(!projectDetails) {
            return res.status(404).json({
                success : false,
                message : "Project is not Found",
            })
        }

        return res.status(200).json({
            success : true,
            message : "Project Details Found Successfully",
            projectDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.findProject = async(req, res) => {
    try {
        const {projectId, userId} = req.body;


        if(!projectId) {
            return res.status(404).json({
                success : false,
                message : "ProjectId Not Found",
            })
        }

        //find project details
        const projectDetails = await Project.findById({_id: projectId});
        if(!projectDetails) {
            return res.status(404).json({
                success : false,
                message : "Project is Not Found",
            })
        }

        //find user details
        const userDetails = await User.findById({_id: userId});
        if(!userDetails) {
            return res.status(404).json({
                success : false,
                message : "User Not Found",
            })
        }

        //if projectId is not present in the user model than add
        const isProjectPresent = userDetails?.projectJoined?.some(projectJoined => projectJoined.toString() === projectId.toString());
        //check you if you owned the project or not
        if(!isProjectPresent && (projectDetails.ownerId !== userId)) {
            await User.findByIdAndUpdate(
                {_id: userId},
                {
                    $push: {
                        projectJoined: projectId,
                    }
                },
                {new: true},
            )
        }

        const accessToken = jwt.sign(
            { userId, projectId: projectDetails._id }, 
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        );
         

        return res.status(200).json({
            success : true,
            message : "Project Details Found Successfully",
            accessToken,
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}