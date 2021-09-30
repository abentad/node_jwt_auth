const router = require('express').Router();
const {signup, signin, signinwithtoken } = require('../controller/auth_controller');
const { requireAuth } = require('../middleware/auth_middleware');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

//multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

//sharp
const modifyProfileImage =  async (req, res, next) => {
    console.log('modifingImage');
    try {
        const fileName = 'uploads/' + 'profile_' +Date.now() + '.jpg';
        await sharp(req.file.buffer).resize(150,150).jpeg({ quality: 50 }).toFile(fileName);
        req.file.path = fileName;
    } catch (error) {
        console.log(error);
    }
    next();
}

router.post('/signup', upload.single('profile') , modifyProfileImage, signup);
router.post('/signin', signin);
router.get('/signinwithtoken', requireAuth, signinwithtoken);


module.exports = router;
