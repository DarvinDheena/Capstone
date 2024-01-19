const app = require('./server');
const mongoose = require('mongoose');
const config = require('./src/utils/config')


// lets connect to the mongodb using mongoose

console.log('connecting to mongodb');

    mongoose.connect(`${config.DB_URL}/capstone`)
        .then (()=>{
            console.log('connected to mongodb');

            // lets start a server
            app.listen(config.PORT,()=>{
                console.log(`Server running on a Port : ${config.PORT}`);
            })
        })
        .catch((error)=>{
            console.log(error);
        })

