const express = require("express");
const router = express.Router();

const {AIchat} = require("../controller/AIchat");
//const {auth} = require("../middleware/auth")

router.post("/ai-chat", AIchat);

module.exports = router;