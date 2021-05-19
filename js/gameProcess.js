import {VALUES} from './deck.js';

export class Gameprocess{
    constructor(playerOneHand,playerTwoHand){
        this.startGame(playerOneHand,playerTwoHand);
    }
    static rootElement = document.getElementById('root');
    
    playerTurn(playerOneHand,playerTwoHand){
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
        console.log(playerTwoHand.cards);
        cardChoose.onchange = (e) => {
            e.srcElement.disabled = "true"
            choosedCard = e.srcElement.value;
            addAction(`You choosed ${choosedCard}`)
            if(playerTwoHand.checkCard(choosedCard)){
                addAction(`How many?  <select name="numberCards" size="1" required autofocus>
                
                </select>`)
                const numberChoose = logs.querySelector("select[name=numberCards]")
                numberChoose.innerHTML = `
                <option disabled selected></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>

                `
            }
            else{
                addAction("You didn't guess.")
                addAction("<strong>Enemy turn</strong>")
                this.enemyTurn();
            }
        }
    }
    enemyTurn(){
        console.log('Enemy turn');
    }
    startGame(playerOneHand,playerTwoHand){
        addAction("<strong>Your turn!</strong>")
        this.playerTurn(playerOneHand,playerTwoHand);
    }
}

function addAction(message) {
    const logs = document.querySelector(".backlog p");
    logs.innerHTML = message + "<br>" + logs.innerHTML
}