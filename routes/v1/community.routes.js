const express = require("express");
const router = express.Router();

const {createCommunity, getCommunity, getCommunityMember,myOwnCommunity} = require('../../controllers/community.controller');
const { authorization } = require("../../middleware/authorization");


/**
 * Endpoint: /v1/community
*/

router.post("/",authorization,createCommunity)
router.get("/",authorization,getCommunity)
router.get('/:id/members',authorization,getCommunityMember)
router.get('/me/owner',authorization,myOwnCommunity)




module.exports = router;

