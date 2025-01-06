const express = require("express");
const router = express.Router();

const {createFile, getProjectFiles, updateFile, deleteFile} = require("../controller/File");
const {auth} = require("../middleware/auth");

router.post("/create-file", createFile);
router.post("/get-project-file", getProjectFiles);
router.post("/update-file", updateFile);
router.post("/delete-file", deleteFile);

module.exports = router;