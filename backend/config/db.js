const mongoose = require('mongoose');
const dbURL = process.env.MONGODB_URI;

async function connectDB(){
    try{
       await mongoose.connect(dbURL)
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDB;