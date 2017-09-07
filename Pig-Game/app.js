/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer;




// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// e.g. how to manipulate element from dom
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

reset();

document.querySelector('.btn-roll').addEventListener('click', function(){
	//1. random number
	// console.log('roll button clicked');
	var dice = Math.floor(Math.random() * 6) + 1;
	// console.log(dice);
	//2. Display the result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	//3. Update the round score If the rolled munber was NOT a 1;
	//if not 1, current score += dice, 
	//else current score = 0, set activePlayer to 1;
	if(dice !== 1) {
	
		roundScore += dice;
		console.log(roundScore);
		document.querySelector('#current-' + Number(activePlayer)).textContent = roundScore; 
	} else {
		document.querySelector('#current-' + Number(activePlayer)).textContent = '0';
		roundScore = 0;
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		activePlayer = !activePlayer;
		console.log(activePlayer);
		document.querySelector('.dice').style.display = 'none';
		window.alert('Ops! You rolled 1. Switch player.');
	}

	return roundScore, activePlayer;

}); 


document.querySelector('.btn-hold').addEventListener('click', function(){
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	if(!activePlayer){
		score[0] += roundScore;
		document.querySelector('#score-' + Number(activePlayer)).textContent = score[0];
		checkWinner(score[0]);
		roundScore = 0;
		activePlayer = !activePlayer;

	} else {
		score[1] += roundScore;
		document.querySelector('#score-' + Number(activePlayer)).textContent = score[1];
		checkWinner(score[1]);
		roundScore = 0;
		activePlayer = !activePlayer;
	}


});

document.querySelector('.btn-new').addEventListener('click', reset);

function checkWinner(totalScore) {
	if(totalScore >= 100) {
		window.alert("the winner is player" + (Number(activePlayer) + 1));
	} 
}

function reset() {
	score = [0, 0];
	roundScore = 0;
	activePlayer = false;
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
}






