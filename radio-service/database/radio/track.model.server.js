var mongoose = require("mongoose");
var trackSchema = require("./track.schema.server");
var db = require("../database");
var trackModel = mongoose.model("TrackModel", trackSchema);

// trackModel.search = function (term) {
//     trackModel.findOne({searchTerm:term}).then(function (res) {
//         if (res) {
//             return res._id;
//         } else {
//
//         }
//     })
// };

module.exports = trackModel;