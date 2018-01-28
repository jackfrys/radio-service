var mongoose = require("mongoose");
var radioSchema = require("./radio.schema.server");
var db = require("../database");
var radioModel = mongoose.model("RadioModel", radioSchema);

radioModel.tracks = function (channel) {
    return radioModel.find({channel: channel})
};

radioModel.createListing = function (name, channel, tracks) {
    var listing = {name: name, _id: channel, tracks: tracks};
    return radioModel.findByIdAndUpdate(channel, {$set: listing}, {upsert: true});
};

radioModel.updateName = function (channel, title) {
    return radioModel.findOneAndUpdate({channel: channel}, {$set: {name: title}});
};

radioModel.getStationTitles = function () {
    return radioModel.find({}, {"name":1, "channel":1, "_id":0}).sort({channel:1});
};

module.exports = radioModel;