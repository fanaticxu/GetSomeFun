

// var app = function() {
// 	// var Question = function(question, answer, correctOne) 
// 	function Question(question, answer, correctOne) 
// 	{
// 		this.question = question;
// 		this.answer = answer;
// 		this.correctOne = correctOne;
// 	}

// 	var q1 = 'Who is the designer for this silly program?'
// 	var q2 = 'Which planet do we live in?'
// 	var q3 = 'Is this the last question?'

// 	var a1 = ['1: James', '2: Frank', '3: Tony'];
// 	var a2 = ['1: earth', '2: moon', '3: mars'];
// 	var a3 = ['1: yes', '2: no'];

// 	var question1 = new Question(q1, a1, '2');
// 	var question2 = new Question(q2, a2, '1');
// 	var question3 = new Question(q3, a3, '2');
// 	var questionDb = [question1, question2, question3];
// 	var scoreTrace = 0

// 	// generate output
// 	// var outPut = 
// 	Question.prototype.outPut = function(){
// 		console.log(this.question);
// 		this.answer.forEach(function(arr) {
// 			console.log(arr);
// 		});
// 	}

// 	// check correct answer
// 	// var correctAnswer = 
// 	Question.prototype.isTrue = function(answerNumber){
		
// 			if(answerNumber != this.correctOne) {
// 				console.log('Wrong answer');
// 				return false;
// 			} else {
// 				console.log('Correct!');
// 				return true;
// 			}
// 	}

// 	// generate random number;
// 	// var randomNumber = Math.floor(Math.random()*3);
// 	// To make it more robuster
// 	var randomNumber = Math.floor(Math.random()*questionDb.length)
// 	// print answer
// 	questionDb[randomNumber].outPut();
// 	// popup input box
// 	var choice = prompt('Please select the correct number');
// 	while(choice.indexOf('exit') === -1) {
// 		if(questionDb[randomNumber].isTrue(choice)){
// 			scoreTrace ++;
// 			console.log('Your current score is: ' + scoreTrace);
// 			console.log('---------------------------------------');
// 			randomNumber = Math.floor(Math.random()*3);
// 			questionDb[randomNumber].outPut();
// 			choice = prompt('Please select the correct number');
// 		} else {
// 			choice = prompt('Please try it again.');
// 		}
		
// 	}
	
// 	alert('Congradulations for stopping this silly game. Your current score is: ' + scoreTrace);
// 	// verdict
// 	// questionDb[randomNumber].isTrue(choice);
// }

// app();

//or use ifee
(function(){
	// var Question = function(question, answer, correctOne) 
	function Question(question, answer, correctOne) 
	{
		this.question = question;
		this.answer = answer;
		this.correctOne = correctOne;
	}

	var q1 = 'Who is the designer for this silly program?'
	var q2 = 'Which planet do we live in?'
	var q3 = 'Is this the last question?'

	var a1 = ['1: James', '2: Frank', '3: Tony'];
	var a2 = ['1: earth', '2: moon', '3: mars'];
	var a3 = ['1: yes', '2: no'];

	var question1 = new Question(q1, a1, '2');
	var question2 = new Question(q2, a2, '1');
	var question3 = new Question(q3, a3, '2');
	var questionDb = [question1, question2, question3];
	var scoreTrace = 0

	// generate output
	// var outPut = 
	Question.prototype.outPut = function(){
		console.log(this.question);
		this.answer.forEach(function(arr) {
			console.log(arr);
		});
	}

	// check correct answer
	// var correctAnswer = 
	Question.prototype.isTrue = function(answerNumber){
		
			if(answerNumber != this.correctOne) {
				console.log('You are wrong!');
				return false;
			} else {
				console.log('Correct!');
				return true;
			}
	}

	// generate random number;
	// var randomNumber = Math.floor(Math.random()*3);
	// To make it more robuster
	var randomNumber = Math.floor(Math.random()*questionDb.length)
	// print answer
	questionDb[randomNumber].outPut();
	// popup input box
	var choice = prompt('Please select the correct number');
	while(choice.indexOf('exit') === -1) {
		if(questionDb[randomNumber].isTrue(choice)){
			scoreTrace ++;
			console.log('Your current score is: ' + scoreTrace);
			console.log('------------------------------');
			randomNumber = Math.floor(Math.random()*3);
			questionDb[randomNumber].outPut();
			choice = prompt('Please select the correct number');
		} else {
			choice = prompt('Please try it again.');
		}
		
	}
	
	alert('Congradulations for stopping this silly game. Your current score is: ' + scoreTrace);
})();
























