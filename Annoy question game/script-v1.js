// Function constructor

// var Person = function(name, yearOfBirth, job) {
// 	this.name = name;
// 	this.yearOfBirth = yearOfBirth;
// 	this.job = job;
// }

//instance
// var john = new Person('John', 1998, 'teacher'); 

//function as a argument
// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn){
// 	var arrRes = [];
// 	for(i = 0; i< arr.length; i++) {
// 		arrRes.push(fn(arr[i]));
// 	}
// 	return arrRes;
// }

// function calculateAge(el) {
// 	return 2016 - el;
// }

// function isFullAge(limit, el) {
// 	return el >= limit;
// }

// var age = arrayCalc(years, calculateAge);
//use bind method to create a copy of isFullAge function an pass 20 as the first argument for this function.
// var japanFull = arrayCalc(age, isFullAge.bind(this, 20));
// var japanFull = arrayCalc(age, isFullAge.bind(this, 20))
// console.log(age);
// console.log(japanFull);



var app = function() {
	var Question = function(question, answer, correctOne) {
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
	Question.prototype.isTrue = function(answerNumber){
		var scoreTrace = 0
		if(answerNumber != this.correctOne) {
			console.log('Wrong answer!');
		} else {
			console.log('Correct!');
			scoreTrace ++;
			console.log('Your current score is: ' + scoreTrace);
			console.log('---------------------------------------');
			
		}
	}
	// generate random number;
	var randomNumber = Math.floor(Math.random()*3);
	// print answer
	questionDb[randomNumber].outPut();
	// popup input box
	var choice = prompt('Please select the correct number');
	// verdict
	questionDb[randomNumber].isTrue(choice);
}

app();

















