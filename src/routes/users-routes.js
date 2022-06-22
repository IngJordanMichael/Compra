const {Router}= require('express');
const router= Router();
const {
    rendersSignUpForm, 
    signup, 
    rendersSigninUpForm,
    signin,
    logout
} = require('../controllers/users-controllers');
router.get('/users/signup', rendersSignUpForm);
router.post('/users/signup', signup);
router.get('/users/signin', rendersSigninUpForm);
router.post('/users/signin', signin);
router.get('/users/logout', logout);

module.exports = router;