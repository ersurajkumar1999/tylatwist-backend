import express from 'express';
import { doLogin, doSignUp, doLogout } from '../controllers/AuthController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin123@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', doLogin);
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: User sign-up
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "JohnDoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/signup', doSignUp);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Invalid email address
 */
router.post('/forgot-password', doSignUp);

/**
 * @swagger
 * /api/v1/auth/email-verification:
 *   post:
 *     summary: Email verification
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               verificationCode:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid verification code
 */
router.post('/email-verification', doSignUp);

export default router;
