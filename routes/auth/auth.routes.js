const { Router } = require('express');
const router = Router();
const loginController = require('../../controllers/auth-controllers/login')
const registerController = require('../../controllers/auth-controllers/register')


//  /api/v1/auth/login
router.post('/login', ...loginController.login);

//  /api/v1/auth/register
router.post('/register', ...registerController.register);


module.exports = router;
