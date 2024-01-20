const postRouter = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');
const verifytoken = require('./verifyToken');

// get all posts 
postRouter.get('/',verifytoken, async(request,response) => {
    try {
        const posts = await Post.find();
        response.status(200).json(posts);
    } catch (error) {
        response.status(400).json({ error });
    }
})

// get the posts only the specified users
postRouter.get('/:userId/posts',verifytoken, async (request,response) => {
    try { 
        const { userId } = request.params ;
        const posts = await Post.find ( { userId });
        response.status(200).json(posts);

    } catch (error) {
        response.status(400).json({ error });
    }

})

// endpoint to like or dislike the posts

postRouter.patch('/:id/like',verifytoken, async (request,response) => {
    try {
        const id = request.params.id ;
        const userId = request.body ;
        const post = await Post.findById(id);
        
        const isLiked = post.likes.get(userId);
        if ( isLiked ){
            post.likes.delete(userId);
        }else {
            post.likes.set(userId, true );
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes : post.likes },
            { new : true }
            );

        response.status(200).json(updatedPost)
    }catch (error) {
        response.status(400).json({ error });
    }
})


module.exports = postRouter ;