var mongoose = require("mongoose");
var radioSchema = mongoose.Schema({
    name: String,
    channel: Number,
    tracks: [{
        title: String,
        artist: String,
        trackId: String
    }],
    fetched: {type: Date, default: Date.now}
}, {collection: "Station"});
module.exports = radioSchema;