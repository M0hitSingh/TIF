const express = require("express");
const router = express.Router();

const authRoutes = require('./auth.routes')
const roleRoutes = require('./role.routes')
const communityRoutes = require('./community.routes');
const memberRoutes = require('./member.routes');

/**
 * Endpoint: /v1
*/

router.use("/auth",authRoutes);
router.use("/role",roleRoutes);
router.use("/community",communityRoutes)
router.use("/member",memberRoutes)



module.exports = router;

