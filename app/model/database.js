var q = require("q");
var connectionString = 'mongodb://127.0.0.1:27017/radio';
if (process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = q;