const { requireAuth } = require('../middleware/auth_middleware');

const router = require('express').Router();
const upload = require('../utils/multer');
const sharp = require('sharp');
const Product = require('../models/Product');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//multer
const uploadProductImages = upload.array('gallery', 3);

const modifyProductImage =  async (req, res, next) => {
    const productImageList = [];
    try {
        for(var i = 0; i < req.files.length; i++){
            const fileName = 'uploads/products/' + 'product_' + Date.now() + '_' + getRandomInt(100) + getRandomInt(100) + '.jpg';
            console.log('called once for', req.files[i]);
            await sharp(req.files[i].buffer).resize(520,430, {fit: "contain"}).jpeg({ quality: 70 }).toFile(fileName);
            productImageList.push(fileName);
        }
        req.files.path = productImageList;
    } catch (error) {
        console.log(error);
    }
    next();
}

 
router.post('/post', requireAuth, uploadProductImages, modifyProductImage, async (req,res)=>{
    console.log('product post called'); 
    const { name, description } = req.body;
    console.log('files', req.files);
    try {
        const product = await Product.create({name, description, datePosted: Date.now(), productImages: req.files.path});
        const responseData = {name: product.name, description: product.description, datePosted: product.datePosted, productImages: product.productImages };
        res.status(201).json( responseData );
    } catch (error) {
        const errors =  handleError(error);
        res.status(400).json({ errors });
    }
});


module.exports = router;