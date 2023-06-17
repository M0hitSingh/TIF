const express = require("express");
const {login,signup, getMe} = require('../../controllers/auth.controller')
const {authorization} = require("../../middleware/authorization")
const router = express.Router();

/**
 * Endpoint: /v1/auth
*/

router.post("/signup",signup);
router.post("/login",login);
router.route("/me").get(authorization,getMe)


module.exports = router;

