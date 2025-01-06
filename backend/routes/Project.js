const express = require("express");
const router = express.Router();

const {createProject, getProjectDetails, findProject} = require("../controller/Project");
const {auth} = require("../middleware/auth");

router.post("/create-project",auth, createProject);
router.post("/project-details",auth, getProjectDetails);
router.post("/find-project", findProject)

module.exports = router;