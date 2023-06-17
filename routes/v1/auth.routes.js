const express = require("express");
const {login,signup} = require('../../controllers/auth.controller')
const router = express.Router();

/**
 * Endpoint: /v1/auth
*/

router.post("/signup",signup);
router.post("/login",login);


module.exports = router;

