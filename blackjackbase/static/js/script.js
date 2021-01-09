var blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2C','2D','2H','2S','3C','3D','3H','3S','4C','4D','4H','4S','5C','5D','5H','5S','6C','6D','6H','6S','7C','7D','7H','7S','8C','8D','8H','8S','9C','9D','9H','9S','10C','10D','10H','10S','KC','KD','KH','KS','JC','JD','JH','JS','QC','QD','QH','QS','AC','AD','AH','AS'],
    'cardsMap': {
        '2C':2,'2D':2,'2H':2,'2S':2,
        '3C':3,'3D':3,'3H':3,'3S':3,
        '4C':4,'4D':4,'4H':4,'4S':4,
        '5C':5,'5D':5,'5H':5,'5S':5,
        '6C':6,'6D':6,'6H':6,'6S':6,
        '7C':7,'7D':7,'7H':7,'7S':7,
        '8C':8,'8D':8,'8H':8,'8S':8,
        '9C':9,'9D':9,'9H':9,'9S':9,
        '10C':10,'10D':10,'10H':10,'10S':10,
        'KC':10,'KD':10,'KH':10,'KS':10,
        'JC':10,'JD':10,'JH':10,'JS':10,
        'QC':10,'QD':10,'QH':10,'QS':10,
        'AC':[1,11],'AD':[1,11],'AH':[1,11],'AS':[1,11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'cash': 100,
    'bet' : 0,
    'isStand': false,
    'turnsOver': false,
    'placeBet': false,
    'has11Ace': false
};

var YOU = blackjackGame['you']
var DEALER = blackjackGame['dealer']
var hitSound = new Audio('static/sounds/swish.m4a');
var winSound = new Audio('static/sounds/cash.mp3');
var lossSound = new Audio('static/sounds/aww.mp3');  
var money = blackjackGame['balance'];

document.querySelector('#blackjack-bet-button').addEventListener('click', blackjackBet);

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function updateBalance() {
    if (blackjackGame['cash'] > 0 && blackjackGame['bet'] == 0 && blackjackGame['isStand'] === false) {
        var amount = prompt("How much money would you like to bet?", 10);

        if (parseInt(amount) <= blackjackGame['cash'] && parseInt(amount) > 0 ) {

            blackjackGame['bet'] = parseInt(amount);
            blackjackGame['cash'] = blackjackGame['cash'] - blackjackGame['bet'];
            document.querySelector('#balance').textContent = blackjackGame['cash'];
            console.log('User bets ' + amount);

        } else if (parseInt(amount) > blackjackGame['cash']) {

            alert("Bet is greater than balance. Place a bet no greater than " + blackjackGame['cash']);

        } else {

            alert("Bet cannot be less than or equal to zero");

        }
    }
}

function lostAll() {
    if (blackjackGame['cash'] == 0 && blackjackGame['bet'] == 0) {
        var amount = alert("You have lost all your money. Here's another 100 dollars.");

        blackjackGame['cash'] = 100;
        document.querySelector('#balance').textContent = blackjackGame['cash'];
    }
}

function blackjackBet() {
    document.querySelector('#balance').textContent = parseInt(blackjackGame['cash']);
    updateBalance();
    blackjackGame['placeBet'] = true;

    if (blackjackGame['bet'] > 0) {
        document.querySelector('#blackjack-bet-button').style.display = 'none';
        document.querySelector('#blackjack-hit-button').style.display = 'inline-block';
        document.querySelector('#blackjack-stand-button').style.display = 'inline-block';
    }
}


function blackjackHit() {
    if (blackjackGame['isStand'] === false && blackjackGame['placeBet'] === true && blackjackGame['bet'] > 0) {
        let card = randomCard();
        console.log(card + ' : ' + blackjackGame['cardsMap'][card]);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        // console.log(YOU['score'])
    }

    if (YOU['score'] > 21) {
        blackjackGame['turnsOver'] = true;

        blackjackGame['losses']++;

        blackjackGame['bet'] = 0;

        showResult(DEALER);

        // console.log(blackjackGame['turnsOver']);
        
        showDealButton();
    }

    if (YOU['score'] === 21) {
        blackjackGame['turnsOver'] = true;

        blackjackGame['wins']++;

        blackjackGame['cash'] = blackjackGame['cash'] + blackjackGame['bet']*2;

        document.querySelector('#balance').textContent = blackjackGame['cash'];

        blackjackGame['bet'] = 0;

        showResult(YOU);

        // console.log(blackjackGame['turnsOver']);   
        
        showDealButton();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 52);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    // let winner = computeWinner();
    // showResult(winner);
    
    // showResult(computeWinner());


    if (blackjackGame['turnsOver'] === true) {

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');   
       
        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
    
        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
        blackjackGame['bet'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;    
    
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['isStand'] = false;
        blackjackGame['turnsOver'] = false;
        blackjackGame['placeBet'] = false;
        blackjackGame['has11Ace'] = false;

        lostAll();

        document.querySelector('#blackjack-bet-button').style.display = 'inline-block';
        document.querySelector('#blackjack-deal-button').style.display = 'none';

    }

}

function updateScore(card, activePlayer) {
    if (card === 'AC' || card === 'AD' || card === 'AH' || card === 'AS') {
    // IF ADDING 11 KEEPS ME BELOW 21, ADD 11; OTHERWISE ADD 1

        if ((activePlayer['score'] + blackjackGame['cardsMap'][card][1]) <= 21) {

            activePlayer['score'] = activePlayer['score'] + blackjackGame['cardsMap'][card][1];
            blackjackGame['has11Ace'] = true;
            console.log(card + ' is 11.');

        } else {

            activePlayer['score'] = activePlayer['score'] + blackjackGame['cardsMap'][card][0];
            console.log(card + ' is 1.');

        }     
        
    } else {

        activePlayer['score'] = activePlayer['score'] + blackjackGame['cardsMap'][card];
    }

    if (activePlayer['score'] > 21 && blackjackGame['has11Ace'] === true) {
        console.log('removing 10 from 11Ace');
        activePlayer['score']  = activePlayer['score'] - 10;
        blackjackGame['has11Ace'] = false;
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    if (YOU['score'] > 0 && YOU['score'] <= 21) {
        blackjackGame['isStand'] = true;
    } else {
        blackjackGame['isStand'] = false;
    }

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true && blackjackGame['turnsOver'] === false) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
        blackjackGame['turnsOver'] = false;
    }

    if (DEALER['score'] > 15 && blackjackGame['turnsOver'] === false) {
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
        // console.log('turnsOver: ' + blackjackGame['turnsOver']);            
    }
}

//compute winner and return who just won
//update wins, draws, and losses

function showDealButton() {
    document.querySelector('#blackjack-hit-button').style.display = 'none';
    document.querySelector('#blackjack-stand-button').style.display = 'none';
    document.querySelector('#blackjack-deal-button').style.display = 'inline-block';
}


function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        //condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            blackjackGame['cash'] = blackjackGame['cash'] + blackjackGame['bet']*2;
            winner = YOU;

            // console.log("higher score than dealer or when dealer busts but you're 21 or under");

            showDealButton();

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

            // console.log("user score less than dealer");

            showDealButton();

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            blackjackGame['cash'] = blackjackGame['cash'] + blackjackGame['bet'];
            
            // console.log("user score same as dealer");

            showDealButton();

        }

        //condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        blackjackGame['cash'] = blackjackGame['cash'] - blackjackGame['bet'];
        winner = DEALER;

        console.log("user busts but dealer doesn't");

        showDealButton();
        
    // condition: when you AND the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;

        showDealButton();
        
    }

    console.log(blackjackGame);
    document.querySelector('#balance').textContent = parseInt(blackjackGame['cash']);
    blackjackGame['bet'] = 0;
    return winner;
}


function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!'
            messsageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!'
            messsageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!'
            messsageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

    }

}

  