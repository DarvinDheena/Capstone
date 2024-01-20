const verifytoken = require('./verifyToken');
const User = require('../models/user');

const userRouter = require('express').Router();

// endpoint to get user details
userRouter.get('/:id',verifytoken, async (request,response)=>{
    try{
        const id = request.params.id ;
        const user = await User.findById(id);
        response.status(200).json(user);
    }catch (error){
        response.status(400).json({ error });
    }
})
// endpoint to get user's friends list 

userRouter.get('/:id/friends',verifytoken,async(request,response)=>{
    try {
        const id = request.params.id ;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>{
             return {_id,firstName,lastName,occupation,location,picturePath};   
            }
        );
        response.status(200).json(formattedFriends);

    }catch (error){
        response.status(400).json({ error });
    }
})

// endpoint to add or remove a friend 
userRouter.patch('/:id/:friendId',verifytoken,async(request,response)=>{
   try {
    const { id,friendId } = request.params ;
    const user = await User.findById(id);
    const friend = await  User.findById(friendId);

    // if the clicked user is in friends list 
    if (user.friends.includes(friendId)){
        user.friends = user.friends.filter(id => id !== friendId);
        friend.friends = friend.friends.filter(id => id !== id );
    }
    // if the clicked user is not in friends list
    else {
        user.friends.push(friendId);
        friend.friends.push(id);
    }
    // lets save both the users
    await user.save();
    await friend.save();

    const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
    );
    formattedFriends = friends.map(
        ({_id,firstName,lastName,occupation,location,picturePath})=>{
         return {_id,firstName,lastName,occupation,location,picturePath};   
        }
    );
    response.status(200).json(formattedFriends);

   }catch (error){
        response.status(400).json( error );
   }
})

module.exports = userRouter ;