const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const verifytoken = async (request,response,next) =>{
    try {
        let token = request.header("authorization");
        if (!token){
            return response.status(400).json({ message : "access denied" });
        }
        if (token.startsWith("Bearer ")){
            token =  token.slice(7,token.length);
        }
        const isVerify = jwt.verify(token,JWT_SECRET);
        request.user = isVerify ;   
        next();
    }catch (error){
        console.log(error);
        response.status(400).json({ message : error })
    }
}

module.exports = verifytoken ;