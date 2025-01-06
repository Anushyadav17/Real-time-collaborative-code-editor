const express = require("express");
const router = express.Router();

const {login, signUp} = require("../controller/user");

router.post("/sign-up", signUp);
router.post("/login", login);

module.exports = router;