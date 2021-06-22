//Challenge 1: Age in days
function accept() {
    var birthyear = prompt("Enter your birthyear");
    var ageindays = (2021 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var text = document.createTextNode('You are ' + ageindays + ' days old');
    h1.setAttribute('id', 'accept');
    h1.appendChild(text);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    var abc = document.getElementById('accept');
    abc.remove();
}

//Challenge 2: Cat generator
function generatecat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-box-img');
    image.src = "../images/tenor.gif";
    div.appendChild(image);
}

//Challenge 3: Rock Paper Scissors
function rpsGame(yourChoice) {
    //console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = choiceRandom(pickRandom());
    //console.log("Computer Choice: " + botChoice);

    results = decideWinner(humanChoice, botChoice);
    //console.log(results);

    message = finalMessage(results);
    //console.log(message);
    rpsfrontEnd(yourChoice.id, botChoice, message);
}

function pickRandom() {
    return Math.floor(Math.random() * 3);
}

function choiceRandom(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, botChoice) {
    var rpsdb = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    };
    var yourScore = rpsdb[yourChoice][botChoice];
    var botScore = rpsdb[botChoice][yourChoice];
    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return { 'message': 'You Lost!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You Tied!', 'color': 'yellow' };
    } else {
        return { 'message': 'You Won!', 'color': 'green' };
    }
}

function rpsfrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imgdb = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');
    var buttondiv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imgdb[humanImageChoice] + "'height=150px width=150px style='box-shadow:0px 10px 10px rgba(70, 70, 226, 7)'>"
    document.getElementById('flex-box-rps-div').appendChild(humandiv);

    messagediv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px;padding:10px'>" + finalMessage['message'] + "</h1>"
    document.getElementById('flex-box-rps-div').appendChild(messagediv);

    botdiv.innerHTML = "<img src='" + imgdb[botImageChoice] + "'height=150px width=150px style='box-shadow:0px 10px 10px rgba(243, 38, 28, 7)'>"
    document.getElementById('flex-box-rps-div').appendChild(botdiv);

    buttondiv.innerHTML = "<button style='background-color:#03c04a;border-radius:5px;font-weight:500;'onClick=refreshPage()>" + 'PlayAgain' + "</button>"
    document.getElementById('btn').appendChild(buttondiv);

}

function refreshPage() {
    window.location.reload();
}


//Challenge 4: Change color of all buttons
var all_buttons = document.getElementsByTagName('button');


var copy_all_buttons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copy_all_buttons.push(all_buttons[i].classList[1]);
}

function buttoncolor(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonReset();
    } else {
        buttonRandom();
    }
}

function buttonRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copy_all_buttons[i]);
    }
}

function buttonRandom() {
    var choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];

    for (let i = 0; i < all_buttons.length; i++) {
        let count = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[i]);
        all_buttons[i].classList.add(choices[count]);
    }
}


//Challenge 5 Blackjack

let blackjackgame = {
    'you': { 'spanscore': '#You-result', 'div': '#you-box', 'score': 0 },
    'dealer': { 'spanscore': '#Dealer-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
};

const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];

const hitSound = new Audio('/images/sounds/swish.m4a');
document.querySelector('#button-hit').addEventListener('click', blackjackhit);


function blackjackhit() {
    let card = randomCards();
    console.log(card);
    showCard(card, YOU);

    updateCards(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardimage = document.createElement('img');
        cardimage.src = `images/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardimage);
        hitSound.play();
    }
}
document.querySelector('#button-deal').addEventListener('click', blackjackdeal);

function blackjackdeal() {
    let yourimage = document.querySelector('#you-box').querySelectorAll('img');
    let dealerimage = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i = 0; i < yourimage.length; i++) {
        yourimage[i].remove();

    }
    for (i = 0; i < dealerimage.length; i++) {

        dealerimage[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#You-result').textContent = 0;
    document.querySelector('#Dealer-result').textContent = 0;
    document.querySelector('#You-result').style.color = 'white';
    document.querySelector('#Dealer-result').style.color = 'white';
}

function randomCards() {
    randomIndex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomIndex];
}

function updateCards(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackgame['cardMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackgame['cardMap'][card][1]
        } else {
            activePlayer['score'] += blackjackgame['cardMap'][card][0]
        }
    } else {
        activePlayer['score'] += blackjackgame['cardMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['spanscore']).textContent = 'BUST!';
        document.querySelector(activePlayer['spanscore']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['spanscore']).textContent = activePlayer['score'];
    }
}