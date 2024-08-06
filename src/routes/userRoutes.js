const express = require('express');
const UserController = require('../app/controller/UserController.js');
const contactController = require('../app/controller/contactController.js');
const auth  = require('../constants/middleware');
const router = express.Router();

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Sample endpoint
 *     description: Returns a sample message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: 'Hello from sample route!'
 */
router.post('/createUser', UserController.createUser);
router.post('/users', auth.isAuthorized, UserController.listOfUsers);
router.post('/userDetails', UserController.userDetails);
router.post('/userUpdate', UserController.updateUser);
router.post('/addAddress', contactController.addAddress);
router.get('/listOfAddress', contactController.listOfAddress);
router.post('/login', UserController.login);
router.post('/encryptDecryptData', UserController.encryptDecrypt);

module.exports = router;