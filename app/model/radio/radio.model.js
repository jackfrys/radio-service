var mongoose = require("mongoose");
var radioSchema = require("./radio.schema");
var db = require("../database");
var radioModel = mongoose.model("RadioModel", radioSchema);

radioModel.tracks = function (channel) {
    return radioModel.find({channel: channel})
};

radioModel.createListing = function (name, channel, tracks) {
    var listing = {name:name, _id:channel, tracks: tracks};
    return radioModel.findByIdAndUpdate(channel, {$set:listing}, {upsert:true});
};

radioModel.updateName = function (channel, name) {
    return radioModel.findByIdAndUpdate(channel, {$set:{name:title}});
};

module.exports = radioModel;