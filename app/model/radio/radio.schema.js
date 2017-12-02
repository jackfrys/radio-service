var mongoose = require("mongoose");
var radioSchema = mongoose.Schema({
    name: String,
    channel: Number,
    tracks: [{
        name: String,
        artist: String,
        itunes: String
    }]
}, {collection: "Station"});
module.exports = radioSchema;