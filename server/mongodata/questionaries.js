var mongoose = require('mongoose');
var questionnaire = mongoose.Schema({
	question: String,
	answer: [
		{
			optionIndex: Number,
			optionContent: String
		}
	]
});
 
var Questionnaire = mongoose.model('Questionnaire', questionnaire);
module.exports = Questionnaire;