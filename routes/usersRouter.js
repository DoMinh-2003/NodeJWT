var express = require('express');
var usersRouter = express.Router();
const auth = require("../models/auth");
const checkRole = require('../middleware/checkRole'); 


/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Check role access
 *     description: This route is protected and requires the user to have the ADMIN role. A valid token must be included in the request header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful access to the admin route.
 */
usersRouter.get('/', checkRole("ADMIN"), (req, res, next) => {
  res.send('checkRole');
});

module.exports = usersRouter;
