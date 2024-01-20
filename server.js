const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const registerRouter = require('./src/controllers/register');
const loginRouter = require('./src/controllers/login');
const userRouter = require('./src/controllers/user');
const verifytoken = require('./src/controllers/verifyToken');
const createPost = require('./src/controllers/createPost');
const postRouter = require('./src/controllers/posts');

// configurations
    /*
        const _filename = fileURLToPath(import.meta.url);
        const __dirname =   path.dirname(_filename);

        app.use(helmet());
        app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin" }));
        app.use(morgan());
        app.use(bodyParser.json({ limit : "30mb" , extended  : true }));
        app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }));
    */


const app = express();

// adding middlewares & parse the body 

app.use(express.json());
app.use(cors());
app.use('/assets',express.static(path.join(__dirname,'/public/assets')));

// adding File Storage ;

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"public/assets");
    },
    filename : function (req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({ storage });


// adding routes
app.get('/',(request,response)=>{
    response.status(200).send("<h1>Welcome</h1>")
})
// Routes with file uploading
app.use('/user/register',upload.single('picture'),registerRouter);
app.post("/posts", verifytoken, upload.single("picture"), createPost);

// Routes 
app.use('/user/login',loginRouter);
app.use('/user',userRouter);
app.use('/posts',postRouter);


module.exports = app ;