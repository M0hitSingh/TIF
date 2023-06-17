const express = require("express");
const router = express.Router();

const authRoutes = require('../v1/auth.routes')
const roleRoutes = require('../v1/role.routes')

/**
 * Endpoint: /v1
*/

router.use("/auth",authRoutes);
router.use("/role",roleRoutes);


module.exports = router;

