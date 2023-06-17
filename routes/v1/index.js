const express = require("express");
const authRoutes = require('../v1/auth.routes')
const router = express.Router();

/**
 * Endpoint: /v1
*/

router.use("/auth",authRoutes);


module.exports = router;

