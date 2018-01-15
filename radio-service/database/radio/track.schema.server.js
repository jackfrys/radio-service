var mongoose = require("mongoose");
var trackSchema = mongoose.Schema({
    title: String,
    artist: String,
    trackId: String,
    fetched: {type: Date, default: Date.now}
}, {collection: "Track"});
module.exports = trackSchema;