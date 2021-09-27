const router = require('express').Router();
const {signup, signin } = require('../controller/auth_controller');


router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;