// import express from 'express';
// import { userList } from '../controllers/UserController.js';
// // import { auth } from '../middlewares/authMiddleware.js';

// const router = express.Router();


// // Start  Admin & Manager Role
// router.post('/list', userList);
// router.post('/store', userList);
// router.post('/show/:id', userList);
// router.post('/update/:id', userList);
// router.post('/destroy/:id', userList);

// // End  Admin & Manager Role

// // Start All Roles
// router.post('/check-email', userList);
// router.post('/check-username', userList);
// router.post('/profile', userList);

// // Ens All Roles
// export default router;

import express from 'express';
import { userList } from '../controllers/UserController.js';

const router = express.Router();

// /**
//  * @swagger
//  * /api/v1/user/list:
//  *   post:
//  *     summary: Get a list of users
//  *     tags: [User]
//  *     responses:
//  *       200:
//  *         description: List of users
//  *       500:
//  *         description: Internal server error
//  */
// router.post('/list', userList);

/**
 * @swagger
 * /api/v1/user/list:
 *   post:
 *     summary: Get a list of users
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 1
 *                 description: The page number for pagination
 *               pageSize:
 *                 type: integer
 *                 example: 2
 *                 description: The number of items per page
 *               filter:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *                     example: "ADMIN"
 *                     description: User role to filter by
 *                   status:
 *                     type: integer
 *                     example: 1
 *                     description: Status to filter by
 *                   kyc_status:
 *                     type: integer
 *                     example: 1
 *                     description: KYC status to filter by
 *                   gender:
 *                     type: string
 *                     example: "Male"
 *                     description: Gender to filter by
 *                   email_status:
 *                     type: integer
 *                     example: 1
 *                     description: Email verification status to filter by
 *                   search:
 *                     type: string
 *                     example: ""
 *                     description: Search term for filtering users
 *             required:
 *               - page
 *               - pageSize
 *               - filter
 *     responses:
 *       200:
 *         description: List of users
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/list', userList);

/**
 * @swagger
 * /api/v1/user/store:
 *   post:
 *     summary: Store a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/store', userList);

/**
 * @swagger
 * /api/v1/user/show/{id}:
 *   post:
 *     summary: Show a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/show/:id', userList);

/**
 * @swagger
 * /api/v1/user/update/{id}:
 *   post:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/update/:id', userList);

/**
 * @swagger
 * /api/v1/user/destroy/{id}:
 *   post:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/destroy/:id', userList);

/**
 * @swagger
 * /api/v1/user/check-email:
 *   post:
 *     summary: Check if an email exists
 *     tags: [User]
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
 *         description: Email check result
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/check-email', userList);

/**
 * @swagger
 * /api/v1/user/check-username:
 *   post:
 *     summary: Check if a username exists
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *     responses:
 *       200:
 *         description: Username check result
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/check-username', userList);

/**
 * @swagger
 * /api/v1/user/profile:
 *   post:
 *     summary: Get user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d5f60e5b3f1c001c8a8f42"
 *     responses:
 *       200:
 *         description: User profile details
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/profile', userList);

export default router;
