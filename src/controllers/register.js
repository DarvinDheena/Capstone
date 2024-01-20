const bcrypt = require('bcrypt');
const registerRouter = require('express').Router();
const User = require('../models/user');


registerRouter.post('/',async( request,response )=>{
   
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            locations,
            occupation
        } = request.body ;

        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(password,salt);

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password : passwordhash ,
            picturePath,
            friends,
            locations,
            occupation
        })
        await newUser.save()
            response.status(200).json(newUser);
    });

module.exports = registerRouter 