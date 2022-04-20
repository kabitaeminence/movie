#!/usr/bin/env node

var perfectapi = require('perfectapi');    
//var perfectapi = require('../../perfectapi/api.js');  
var main = require('../lib/main.js');
var path = require('path');

var configPath = path.resolve(__dirname, '..', 'perfectapi.json');
var parser = new perfectapi.Parser();
parser.on("send", function(config, callback) {

	main.send(config, callback);
});
 
//expose our API
module.exports = parser.parse(configPath);

