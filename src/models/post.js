const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId : {
        type : String ,
        require : true
    },
    firstName : {
        type : String ,
        require : true,
    },
    lastName : {
        type : String ,
        require : true,
    },
    picturePath : {
        type : String,
    },
    location : String ,
    description : String ,
    userPicturePath : String ,
    likes : {
        type : Map ,
        of : Boolean ,
    },
    comments : {
        type : Array ,
        default : []
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Post',postSchema);