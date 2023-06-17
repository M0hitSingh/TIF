const express = require("express");
const router = express.Router();

const {createRole, getAllrole} = require('../../controllers/role.controller')
/**
 * Endpoint: /v1/role
*/


router.post("/",createRole);
router.get("/",getAllrole);

module.exports = router;