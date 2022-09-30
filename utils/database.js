const mongo = require('mongoose');

const config = require("../config");

const mongoDBConnection = mongo.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`);

module.exports = mongoDBConnection;
