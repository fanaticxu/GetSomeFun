/*
GAME RULES 2.0:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- The player will lose current score if rolls two same number.

Add an input field to the HTML where players can set the winning score.

*/
// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// e.g. how to manipulate element from dom
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

var scores, roundScore, activePlayer, gamePlaying, isTrue, diceDb;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		//1. random number
		// console.log('roll button clicked');
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		//2. Display the result
		var dice1DOM = document.querySelector('.dice1');
		var dice2DOM = document.querySelector('.dice2');

		dice1DOM.style.display = 'block';
		dice1DOM.src = 'dice-' + dice1 + '.png';
		dice2DOM.style.display = 'block';
		dice2DOM.src = 'dice-' + dice2 + '.png';

		
		// save the latest two dice number.
		diceDb[0] = dice1;
		diceDb[1] = dice2;
		diceTwice = dice1 + dice2;
		console.log(diceDb[0]);
		console.log(diceDb[1]);
		

		//3. Update the round score If the rolled munber was NOT a 1;
		//if not 1, current score += dice, 
		//else current score = 0, set activePlayer to 1;
 		if(diceDb[0] === 6 && diceDb[1] === 6) {
			document.querySelector('#current-' + activePlayer).textContent = '0';
			nextStep();
			console.log('Ops! you rolled two same number, switch to player ' + (activePlayer + 1));
			// reset diceDb to prevent trigger case like the last roll = the first roll of the new player.
		}		
		else if(diceDb[0] !== 1 && diceDb[1] !== 1) {
			//add dice result to current score.
			roundScore += diceTwice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			console.log('dice 0: ' + diceDb[0] +' dice 1: ' + diceDb[1]);
		}
		else {
			document.querySelector('#current-' + activePlayer).textContent = '0';
			nextStep();
			console.log('Ops! You rolled 1. Switch to player ' + (activePlayer + 1));
		}
	}

}); 


document.querySelector('.btn-hold').addEventListener('click', function(){
	score[activePlayer] += roundScore;
	checkWinner(score[activePlayer]);
	if(gamePlaying){
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
		nextStep();

	}

});

document.querySelector('.btn-new').addEventListener('click', init);

function nextStep() {
	//change player indicator
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//set current score to 0
	diceDb = [0, 0];
	roundScore = 0;
	//switch players effect
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	// console.log('current player is: player' + (activePlayer + 1));
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
}

function checkWinner(totalScore) {
	var winningScore = document.querySelector('.btn-change').value;
	if(totalScore >= winningScore) {
		// window.alert("the winner is player" + (Number(activePlayer) + 1));
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
		document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
		document.querySelector('.dice1').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
	} 
}

function init() {
	gamePlaying = true;
	isTrue = true;
	diceDb = [0, 0];
	score = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
}






