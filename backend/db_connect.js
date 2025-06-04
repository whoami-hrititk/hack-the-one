const mongoose = require('mongoose');

const connect_db = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/hacktheone', {useNewUrlParser:true, useUnifiedTopology:true});
        console.log("MongoDb Connected!");
    } catch(err){
        console.error("MongoDb connection error: ", err.message);
        process.exit(1);
    }
};

module.exports = connect_db;