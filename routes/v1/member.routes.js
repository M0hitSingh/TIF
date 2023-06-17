const express = require("express");
const router = express.Router();

const {addMember, removeMember} = require('../../controllers/member.controller');
const { authorization } = require("../../middleware/authorization");


/**
 * Endpoint: /v1/member
*/

router.post("/",authorization,addMember)
router.delete("/:id",authorization,removeMember)





module.exports = router;

