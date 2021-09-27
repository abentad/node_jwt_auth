const User = require('../models/User');

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


module.exports = {
    signup: async (req,res)=>{
        console.log('sign up called'); 
        const { username,email, password } = req.body;
        try {
            //will create a user object using the model "User" and stores it to mongodb and also stores it into variable 'user' locally after storing to db
            const user = await User.create({ username, email, password });
            res.status(201).json(user);
        } catch (error) {
            const errors =  handleError(error);
            res.status(400).json({ errors });
        }
    },
    signin: async(req,res)=>{
        res.json({message: "signin"});
    }
}