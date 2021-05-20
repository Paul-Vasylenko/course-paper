import {VALUES, SUITS, takeCard} from './deck.js';
import {myInterface} from './interface.js';
export class Gameprocess{
    constructor(playerOneHand,playerTwoHand,deck){
        this.deck = deck;
        this.startGame(playerOneHand,playerTwoHand);
    }
    static rootElement = document.getElementById('root');
    
    playerTurn(playerOneHand,playerTwoHand){
            while(playerOneHand.cards.length!=4){
                this.playerTakeCard(playerOneHand, 'player1')
            }
        

    const logs = document.querySelector(".backlog p");

        addAction(`Choose a card  <select name="cardValue" size="1"  required autofocus></select>`)
        const cardChoose = logs.querySelector("select[name=cardValue]")
        cardChoose.innerHTML ="<option disabled selected></option>"
        let cardValues = playerOneHand.cardValues;
        for(let i in VALUES){
            if(cardValues.includes(VALUES[i]))
            {
                cardChoose.innerHTML = cardChoose.innerHTML+"<option value='"+VALUES[i]+"'>"+VALUES[i]+"</option>"
            }
            else{
                cardChoose.innerHTML = cardChoose.innerHTML+"<option value='"+VALUES[i]+"' disabled>"+VALUES[i]+"</option>"

            }

        }
        let choosedCard;
        for(let i in playerTwoHand.cards){
            console.log(playerTwoHand.cards[i]);
        }
        cardChoose.onchange = (e) => {
            console.log(e)
            e.srcElement.disabled = "true"
            choosedCard = e.srcElement.value;
            addAction(`You choosed ${choosedCard}`)
            if(playerTwoHand.checkCardValue(choosedCard)){
                addAction(`How many?  <select name="numberCards" size="1" required autofocus></select>`)
                const numberChoose = logs.querySelector("select[name=numberCards]")
                numberChoose.innerHTML = `
                <option disabled selected></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                `
                numberChoose.onchange = (e) => {
                    e.srcElement.disabled = "true";
                    const choosedNumber = e.srcElement.value;
                    addAction(`You choosed ${choosedNumber}`)
                    const realNumber = playerTwoHand.countNumberOfCard(choosedCard);
                    if((+choosedNumber)===realNumber){
                    addAction(`Choose suits?  <select name="cardSuits" size="2" required autofocus multiple></select>`)
                    const suitsChoose = logs.querySelector("select[name=cardSuits]")
                    suitsChoose.innerHTML = `
                    <option disabled ></option>`
                    const playerSuits = playerOneHand.getCardSuits(choosedCard);
                    for(let i in SUITS){
                        if(!playerSuits.includes(SUITS[i])){
                            suitsChoose.innerHTML += `<option value="${SUITS[i]}">${SUITS[i]}</option>`
                        }
                        
                    }
                    let suitsChoosed = []
                    suitsChoose.onchange = (e) => {
                        if(suitsChoosed.length < choosedNumber){
                            suitsChoosed.push(e.srcElement.value)
                            let choosedSuit = e.srcElement.querySelector(`option[value=${e.srcElement.value}]`)
                            choosedSuit.disabled="true";
                            if(suitsChoosed.length == choosedNumber){
                                e.srcElement.disabled = "true";
                                e.srcElement.size = "1";
                                addAction(`You choosed ${suitsChoosed.join(' ')}`)
                                this.getEnemyCards(playerOneHand,playerTwoHand,suitsChoosed,choosedCard, 'player1');
                                this.enemyTurn();
                            }
                        }
                        
                    }
                    }
                    else{
                    addAction(`You didn't guess`)
                    this.playerTakeCard(playerOneHand, 'player1')
                    this.enemyTurn();
                    }
                }
            }
            else{
                addAction("You didn't guess.")
                this.playerTakeCard(playerOneHand, 'player1')
                this.enemyTurn();
            }
        }
    }
    enemyTurn(){
        
        addAction("<strong>Enemy turn</strong><br>")
    }
    getEnemyCards(toHand,fromHand,suits, value, player){
        let actionText = ""
        for(let suit of suits){
            actionText+= value + suit + ", "
        }
        if(player == 'player1'){
            addAction("Cards to be checked: "+actionText)
        }
        actionText = "";
        let counter =0;
        for(let suit of suits){
            if(fromHand.checkCard(value,suit)){
                const guessedCard = fromHand.getCard(value, suit);
                actionText += value+suit+", "
                counter++;
                toHand.addCard(guessedCard)
            }
        }
        if(player == 'player1'){
            if(counter == 0){
                addAction("You didn't guess");
                this.playerTakeCard(toHand, 'player1')
            }
            else{
                addAction("You've got cards: "+actionText)
                if(counter < suits.length){
                this.playerTakeCard(toHand, 'player1')
                }
            }
        }
        myInterface.renderPlayerHand(toHand)
        myInterface.renderEnemyHand(fromHand)

    }
    startGame(playerOneHand,playerTwoHand){
        addAction("<strong>Your turn!</strong>")
        this.playerTurn(playerOneHand,playerTwoHand);
    }
    playerTakeCard(playerHand, player){
        playerHand.cards.push(takeCard(this.deck))
        myInterface.renderPlayerHand(playerHand)
        if(player == 'player1'){
            addAction(`You took a card: `+playerHand.cards[playerHand.cards.length-1].value+
            playerHand.cards[playerHand.cards.length-1].suit)
        }
        else{
            addAction(`Enemy took a card: `+playerHand.cards[playerHand.cards.length-1].value+
            playerHand.cards[playerHand.cards.length-1].suit)
        }
    }
}

function addAction(message) {
    const logs = document.querySelector(".backlog p");
    logs.innerHTML = message + "<br>" + logs.innerHTML
}