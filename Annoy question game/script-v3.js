//use iefee
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
	Question.prototype.isTrue = function(answerNumber, callback){
		var sc;
		if(answerNumber != this.correctOne) {
			console.log('You are wrong!');
			sc = callback(false);
		} else {
			console.log('Correct!');
			sc = callback(true);
		}

		return display(sc);	
	}


	// use Closure to keep score
	function score() {
		var currentScore = 0;
		return function(correct) {
			if(correct) {
				currentScore++
			}
			return currentScore;
		}
	}
	// make a copy of the Closure function 
	var keepScore = score();

	// display current score
	function display(score) {
		console.log('Your current score is: ' + score);
		console.log('--------------------------');
	}


	function nextFunction() {
		// generate random number;
		// var randomNumber = Math.floor(Math.random()*3);
		// To make it more robuster
		var randomNumber = Math.floor(Math.random()*questionDb.length)
		// print answer
		questionDb[randomNumber].outPut();
		// popup input box
		var choice = prompt('Please select the correct answer.');

		if(choice !== 'exit') {
			questionDb[randomNumber].isTrue(choice, keepScore);
			nextFunction();
		}
		alert('Congratulations for stopping this silly game. your current score is: ' + keepScore());
	}

	nextFunction();
})();
