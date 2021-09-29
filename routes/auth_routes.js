const router = require('express').Router();
const {signup, signin, signinwithtoken } = require('../controller/auth_controller');
const { requireAuth } = require('../middleware/auth_middleware');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signinwithtoken', requireAuth, signinwithtoken);


module.exports = router;