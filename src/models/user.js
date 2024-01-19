const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        require : true,
        min : 2,
        max : 50
    },
    lastName : {
        type : String ,
        require : true,
        min : 2,
        max : 50
    },
    email : {
        type : String ,
        require : true,
        max : 50,
        unique : true
    },
    password : {
        type : String,
        max : 10,
        require : true
    },
    picturePath : {
        type : String,
        default : ""
    },
    friends : {
        type : Array,
        default : []
    },
    location : String,
    occupation : String,
    viewedProfiles : Number,
},{
    timestamps : true
});

module.exports = mongoose.model('User',userSchema,'users');