var mongoose = require("mongoose");
var radioSchema = require("./radio.schema");
var db = require("../database");
var pageModel = mongoose.model("RadioModel", radioSchema);

module.exports = pageModel;