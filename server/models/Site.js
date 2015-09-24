'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var siteSchema = new Schema({ name: String });

siteSchema.plugin(findOrCreate);

module.exports = mongoose.model('Site', siteSchema);
