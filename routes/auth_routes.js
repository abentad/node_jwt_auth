const router = require('express').Router();
const {signup, signin, signinwithtoken } = require('../controller/auth_controller');
const { requireAuth } = require('../middleware/auth_middleware');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

//multer
//will create a memory temp storage to store the buffers of the selected image file
//then multer will use that storage to upload a single image file in the signup route
const storage = multer.memoryStorage();
const upload = multer({ storage });

//sharp
//will create a file name for the modified file and stores it in the uploads folder
//will grab the image buffers from multer then resizes it then converts it to jpeg format with quality 50% 
//then it will use the filename created above to save the output
//then sets the req.file.path to be the newly modified files' path to be passed to the next function so it can be accessed using req.file.path
const modifyProfileImage =  async (req, res, next) => {
    try {
        const fileName = 'uploads/' + 'profile_' +Date.now() + '.jpg';
        await sharp(req.file.buffer).resize(120,120).jpeg({ quality: 50 }).toFile(fileName);
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
