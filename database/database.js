//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB =  process.env.connectionString || "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
mongoose.connect(mongoDB);

//Get the default connection
const db = mongoose.connection;
              
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const disconnectDatabase = ()=> {
    db.close(true);
}

module.exports = disconnectDatabase;