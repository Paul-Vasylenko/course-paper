import {VALUES, SUITS, takeCard} from './deck.js';
import {myInterface} from './interface.js';
export class Gameprocess{
    constructor(playerOneHand,playerTwoHand,deck){
        this.deck = deck;
        this.imagineHand = [];
        this.lastused=[];
        this.startGame(playerOneHand,playerTwoHand);
    }
    static rootElement = document.getElementById('root');
    
    playerTurn(playerOneHand,playerTwoHand){
            while(playerOneHand.cards.length<4){
                const takenCard = this.playerTakeCard(playerOneHand, 'player1')
                this.checkForChest(takenCard, playerOneHand); 
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
                                this.enemyTurn(playerOneHand,playerTwoHand);
                            }
                        }
                        
                    }
                    }
                    else{
                    addAction(`You didn't guess`)
                    const takenCard =this.playerTakeCard(playerOneHand, 'player1')
                    while(this.checkForChest(takenCard, playerOneHand)){
                    
                    } 
                    this.imagineHand.push(new ImagineHandCard(choosedCard,false));
                    this.enemyTurn(playerOneHand,playerTwoHand);
                    }
                }
            }
            else{
                addAction("You didn't guess.")
                const takenCard = this.playerTakeCard(playerOneHand, 'player1');
                while(this.checkForChest(takenCard, playerOneHand)){
                    
                }
                this.imagineHand.push(new ImagineHandCard(choosedCard,false));
                this.enemyTurn(playerOneHand,playerTwoHand);
            }
        }
    }
    enemyTurn(playerOneHand,playerTwoHand){
        while(playerTwoHand.cards.length<4){
            const takenCard = this.playerTakeCard(playerTwoHand, 'player2')
            this.checkForChest(takenCard, playerTwoHand); 
        }
        console.log(playerTwoHand)
        console.log(this.imagineHand)
        addAction("<strong>Enemy turn</strong><br>")
        let priority = -1;
        let bestCardValue=null;
        for(let value of VALUES){
            const newPriority = this.getCardPriority(value, playerTwoHand);
            if(priority<newPriority){
                priority=newPriority;
                bestCardValue = value;
            }
        }
        addAction(`Ememy asked ${bestCardValue}`)
        if(playerOneHand.checkCardValue(bestCardValue)){
            const numberToAsk = this.imagineHand.filter(item=>item.value==bestCardValue).length;
            addAction(`Ememy asked ${numberToAsk} cards`)
            if(playerOneHand.countNumberOfCard(bestCardValue) == numberToAsk){
                let suitsInHand = playerTwoHand.getCardSuits(bestCardValue);
                let suitsInImagineAccurate = this.imagineHand.map(item => {
                    if(item.value == bestCardValue && item.accurate) return item.suit
                })
                let suitsInImagineNot = new Set();
                let inImagineNotArr=this.imagineHand.map(item=>{
                    if(item.value == bestCardValue && item.isNot.length!=0){
                        return item.isNot[0];
                    }
                }); 
                
               
                inImagineNotArr.forEach(item=>{
                    if(item){
                        suitsInImagineNot.add(item);
                    }
                })
                
                inImagineNotArr = Array.from(suitsInImagineNot);
                let suitsToAsk = []
                for(let suit of SUITS){
                    if(suitsInImagineAccurate.includes(suit)){
                        suitsToAsk.push(suit);
                    }
                }
                if(suitsToAsk.length != numberToAsk){
                    for(let suit of SUITS){
                        if(suitsToAsk.length == numberToAsk)break;
                        else{
                            if(!suitsInHand.includes(suit) && !inImagineNotArr.includes(suit) && !suitsToAsk.includes(suit)){
                                suitsToAsk.push(suit)
                            }
                        }
                    }
                }
                this.getEnemyCards(playerTwoHand,playerOneHand,suitsToAsk,bestCardValue, 'player2');
                this.playerTurn(playerOneHand,playerTwoHand);
            }
            else{
                addAction("Enemy didn't guess.")
                let i = this.imagineHand.findIndex((item,index)=>{
                    if(item.value==bestCardValue && item.isNot.length==0 && item.accurate==false){
                        return index
                    }
                })
                if(i){
                    this.imagineHand.splice(i,1);
                }
                else{
                    i = this.imagineHand.findIndex((item,index)=>{if(item.value == bestCardValue &&  item.accurate==false) return index})
                    if(i){
                        this.imagineHand.splice(i,1);
                    }
                    else{
                    i = this.imagineHand.findIndex((item,index)=>{if(item.value == bestCardValue) return index})
                    this.imagineHand.splice(i,1);
                    }
                }
                const takenCard = this.playerTakeCard(playerTwoHand, 'player2');
                
                while(this.checkForChest(takenCard, playerTwoHand)){
                        
                }
                this.playerTurn(playerOneHand,playerTwoHand);
            }
        }
        else{
            addAction("Enemy didn't guess.")
            const takenCard = this.playerTakeCard(playerTwoHand, 'player2');
            while(this.checkForChest(takenCard, playerTwoHand)){
                    
            }
            this.playerTurn(playerOneHand,playerTwoHand);
        }
        
    }
    getEnemyCards(toHand,fromHand,suits, value, player){
        let actionText = ""
        for(let suit of suits){
            actionText+= value + suit + ", "
        }
        if(player == 'player1'){
            addAction("Cards to be checked: "+actionText)
        }
        else{
            addAction("Cards to be checked(enemy): "+actionText)
        }
        actionText = "";
        let counter =0;
        if(player=="player1"){
            for(let suit of suits){
                if(fromHand.checkCard(value,suit)){
                    const guessedCard = fromHand.getCard(value, suit);
                    actionText += value+suit+", "
                    counter++;
                    this.imagineHand.push(new ImagineHandCard(value,true,[],suit))
                    toHand.addCard(guessedCard)
                    while(this.checkForChest(guessedCard, toHand)){
                    }
                }
                else{
                    this.imagineHand.push(new ImagineHandCard(value,false,[suit]));
                }
            }
                
                if(counter == 0){
                    addAction("You didn't guess");
                    const takenCard = this.playerTakeCard(toHand, 'player1')
                    while(this.checkForChest(takenCard, toHand)){                        
                    }
                }
                else{
                    if(counter == suits.length){
                        this.imagineHand.push(new ImagineHandCard(value,false));
                    }
                    addAction("You've got cards: "+actionText)
                    if(counter < suits.length){
                    let takenCard = this.playerTakeCard(toHand, 'player1')
                    while(this.checkForChest(takenCard, toHand)){
                    }
                    }
                }
                myInterface.renderPlayerHand(toHand)
                myInterface.renderEnemyHand(fromHand)
            
        }
        else{
            for(let suit of suits){
                if(fromHand.checkCard(value,suit)){
                    const guessedCard = fromHand.getCard(value, suit);
                    actionText += value+suit+", "
                    counter++;
                    toHand.addCard(guessedCard)
                    while(this.checkForChest(guessedCard, toHand)){
                    }
                }
            }
                if(counter == 0){
                    addAction("Enemy didn't guess");
                    const takenCard = this.playerTakeCard(toHand, 'player2')
                    while(this.checkForChest(takenCard, toHand)){
                        
                    }
                }
                
                else{
                    addAction("Enemy got cards: "+actionText)
                    if(counter < suits.length){
                    let takenCard = this.playerTakeCard(toHand, 'player2')
                    while(this.checkForChest(takenCard, toHand)){
                    }
                    }
                }

            myInterface.renderPlayerHand(fromHand)
            myInterface.renderEnemyHand(toHand)
        }
        

    }
    startGame(playerOneHand,playerTwoHand){
        addAction("<strong>Your turn!</strong>")
        this.playerTurn(playerOneHand,playerTwoHand);
    }
    playerTakeCard(playerHand, player){
        playerHand.cards.push(takeCard(this.deck))
        if(player == 'player1'){
            myInterface.renderPlayerHand(playerHand)
            addAction(`You took a card: `+playerHand.cards[playerHand.cards.length-1].value+
            playerHand.cards[playerHand.cards.length-1].suit)
        }
        else{
            myInterface.renderEnemyHand(playerHand)
            addAction(`Enemy took a card: `+playerHand.cards[playerHand.cards.length-1].value+
            playerHand.cards[playerHand.cards.length-1].suit)
        }
        myInterface.renderDeck(this.deck)
        return playerHand.cards[playerHand.cards.length-1].value;
    }
    getCardPriority(cardValue, playerHand){
        let newPriority = 0;
        let numberInHand = playerHand.countNumberOfCard(cardValue);
        if(numberInHand==0){
            newPriority=0;
        }
        else if(numberInHand==1){
            let cardinlastused = this.lastused.find(item => item==cardValue)
            if(cardinlastused){
                let counter=0;
                this.imagineHand.forEach(item=>{
                    if(item.accurate==true) counter++;
                })
                if(counter=0)newPriority=0
                else if(counter==1) newPriority=0
                else if(counter==2) newPriority=2500
                else if(counter==3) newPriority=10000
            }
            else{
                let counter=0;
                this.imagineHand.forEach(item=>{
                    if(item.value==cardValue) counter++;
                })
                if(counter==0)newPriority=1000
                else if(counter==1){
                    if(this.imagineHand.find(item=>item.value==cardValue).accurate){
                        newPriority=1800
                    }
                    else{
                        newPriority=1100
                    }
                }
                else if(counter==2){
                    let counterAcc=0;
                    this.imagineHand.forEach(item=>{
                    if(item.accurate==true) counterAcc++;
                    })
                    if(counterAcc==0) newPriority=2100
                    else if(counterAcc==1) newPriority=2500
                    else if(counterAcc==2) newPriority=2800
                }
                else if(counter==3) newPriority=10000
            }
        }
        else if(numberInHand==2){
            let cardinlastused = this.lastused.find(item => item==cardValue)
            if(cardinlastused){
                let counter=0;
                this.imagineHand.forEach(item=>{
                    if(item.accurate==true) counter++;
                })
                if(counter=0)newPriority=0
                else if(counter==1) newPriority=2800
                else if(counter==2) newPriority=10000
            }
            else{
                let counter=0;
                this.imagineHand.forEach(item=>{
                    if(item.value==cardValue) counter++;
                })
                if(counter==0) newPriority=1800
                else if(counter==1){
                    if(this.imagineHand.find(item=>item.value==cardValue).accurate){
                        newPriority=2800
                    }else{
                        newPriority=2500
                    }
                }
                else if(counter==2){ newPriority=10000}
            }
        }
        else if(numberInHand==3){
            let cardinlastused = this.lastused.find(item => item==cardValue)
            if(cardinlastused){
                let counterim=0;
                this.imagineHand.forEach(item=>{
                    if(item.value==cardValue) counterim++;
                })
                if(counterim==0) newPriority=0;
                else{
                    newPriority=10000
                }
            }
            else{
                let counterim=0;
                this.imagineHand.forEach(item=>{
                    if(item.value==cardValue) counterim++;
                })
                if(counterim==0) newPriority=2600;
                else{
                    newPriority=10000
                }
            }
        }
        else if(numberInHand == 4){
            checkForChest(cardValue,playerHand)
        }

        return newPriority
    }
    checkForChest(value,playerHand){
        let counter=0;
        playerHand.cards.forEach(item=>{
            if(item.value == value) counter++;
        })
        if(counter==4){
            playerHand.createChest(value)
            return true;
        }
        return false;
    }
}

class ImagineHandCard{
    constructor(value,accurate,isNot = [], suit){
        this.value = value;
        this.accurate = accurate;
        this.isNot = isNot;
        if(suit){
            this.accurate = true;
            this.suit = suit
        }
    }

}

function addAction(message) {
    const logs = document.querySelector(".backlog p");
    logs.innerHTML = message + "<br>" + logs.innerHTML
}