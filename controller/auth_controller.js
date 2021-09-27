const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

//handle errors
const handleError = (error) => {
    console.log(error.message, error.code);
    let compiledError = { username: '', email: '', password: '' };
    //duplicate errors
    if(error.code === 11000){
        compiledError['email'] = 'Email is already registered';
        return compiledError;
    }
    //validation errors
    if(error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({properties}) => {
            compiledError[properties.path] = properties.message;
        });
    }

    return compiledError;
}

const maxAge = 7 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'key to hash the jwt with', {expiresIn: maxAge});
}


module.exports = {
    signup: async (req,res)=>{
        console.log('sign up called'); 
        const { username,email, password } = req.body;
        try {
            //will create a user object using the model "User" and stores it to mongodb and also stores it into variable 'user' locally after storing to db
            const user = await User.create({ username, email, password });
            const token = createToken(user.id);
            const responseData = {username: user.username, email: user.email, userId: user.id, token: token };
            res.status(201).json( responseData );
        } catch (error) {
            const errors =  handleError(error);
            res.status(400).json({ errors });
        }
    },
    signin: async(req,res)=>{
        res.json({message: "signin"});
    }
}