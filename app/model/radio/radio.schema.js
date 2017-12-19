var mongoose = require("mongoose");
var radioSchema = mongoose.Schema({
    name: String,
    channel: Number,
    tracks: [{
        title: String,
        artist: String,
        trackId: String
    }]
}, {collection: "Station"});
module.exports = radioSchema;