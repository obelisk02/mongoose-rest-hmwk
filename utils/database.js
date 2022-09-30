const mongo = require('mongoose');

const config = require("../config");

const mongoDBConnection = mongo.connect(config.url);

module.exports = mongoDBConnection;
