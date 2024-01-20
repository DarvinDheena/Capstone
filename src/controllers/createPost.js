const Post = require('../models/post');
const User = require('../models/user');

const createPost = async ( request,response ) => {
    try {
        const { userId , description , picturePath } = request.body ;
        const user = await User.findById(userId);

        const newPost = new Post ({
            userId ,
            firstName : user.firstName,
            lastName : user.lastName,
            picturePath,
            location : user.location,
            description ,
            userPicturePath : user.picturePath ,
            likes : {},
            comments : []
        })

        await newPost.save();

        const allPosts = await Post.find();
        
        response.status(200).json({ allPosts });

    } catch (error){
        response.status(400).json({error});
    }
};

module.exports = createPost ;