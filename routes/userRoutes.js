const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// routes/userRoutes.js
router.get('/', (req, res) => {
    res.redirect('/login');
  });
  

router.get('/signup', userController.renderSignup);




router.get('/login', userController.renderLogin);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


module.exports = router;
