const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

loginRouter.get('/',async( request,response)=>{
    const { email,password } = request.body ;
    const user = await User.findOne({ email })
    if (!user){
        return response.status(400).json({ message : "user does not exist" });
    }
    const isAuth = await bcrypt.compare(password,user.password)
    if (!isAuth){
        return response.status(400).json({ message : "password did not match or incorrect" })
    }
    const token = jwt.sign({ id : user._id },JWT_SECRET);
    response.status(200).json({ token , user });    
})

module.exports = loginRouter ;