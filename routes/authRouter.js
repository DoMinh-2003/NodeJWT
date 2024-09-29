import authController from '../controller/authController'
const express = require("express");
const authRouter = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "exampleUser"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login with token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *                 username:
 *                   type: string
 *                   example: "exampleUser"
 *                 name:
 *                   type: string
 *                   example: "Example Name"
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
authRouter.post("/login", authController.login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Create a new user account with username, email, password, and full name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newUser"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               fullName:
 *                 type: string
 *                 example: "New User"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "newUser"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "newuser@example.com"
 *                 fullName:
 *                   type: string
 *                   example: "New User"
 *                 userId:
 *                   type: string
 *                   example: "your_user_id_here"
 *       400:
 *         description: Username or email already exists
 *       500:
 *         description: Server error
 */
authRouter.post("/register", authController.register);

/**
 * @swagger
 * /api/login-google:
 *   post:
 *     tags: [Auth]
 *     summary: Login with Google
 *     description: Authenticate user with Google token and return user information along with JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Google ID token obtained from the client.
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 fullName:
 *                   type: string
 *                   description: User's full name
 *                 email:
 *                   type: string
 *                   description: User's email
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 role:
 *                   type: string
 *                   description: User's role
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       401:
 *         description: Unauthorized
 */
authRouter.post("/login-google", authController.loginGoogle);

module.exports = authRouter;
