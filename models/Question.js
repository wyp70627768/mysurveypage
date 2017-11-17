var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Question = new Schema({
  id: {
    type: Number
  },
  question: {
    type: String
  }
},{
    collection: 'questions'
});

module.exports = mongoose.model('Question', Question);