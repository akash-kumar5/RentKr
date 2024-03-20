const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/yt_mernb";
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI;

const connectDb = async () => { 
    try {
        await mongoose.connect(URI);
        console.log("Connction succesful to db.")
    } catch (error) {
        console.log("db connnection failed");
        console.log(error);
        process.exit(0);
    }
};

module.exports = connectDb;