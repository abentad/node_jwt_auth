const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
 
//it will create a schema defining the data that is going to be stored in the mongo database
//username: is required, is unique, islowercase
//password: has minlength of 8 characters
//if user inputs data that doesnot satisfy these rules the data wont be stored to the database
const userSchema = new mongoose.Schema({
     username: { 
          type: String,
          required: [true, 'Please enter a username'],
          lowercase: true
     },
     email: {
          type: String,
          required:  [true, 'Please enter an email'],
          unique: true,
          lowercase: true,
          validate: [isEmail, 'Please enter a valid email']
     },
     password: {
          type: String,
          required: [true, 'Please enter an password'],
          minlength: [8, 'Minimum password length required is 8 characters'] 
     } 
}); 

userSchema.pre('save', async function(next){
     const salt = await bcrypt.genSalt();
     this.password = await bcrypt.hash(this.password, salt);
     next();
});
 
//will create a model called "User" that connects to collection called 'users' using the schema above to our database
const User = mongoose.model('user', userSchema); 

module.exports = User; 