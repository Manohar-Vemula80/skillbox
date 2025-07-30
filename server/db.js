const mongoose = require('mongoose');

function connectTodb(){
    mongoose.connect(process.env.MONGO_URL,
     

    ).then(()=>{
        console.log('Connectes to db');
    }).catch(err=> console.log(err));
}

module.exports= connectTodb;