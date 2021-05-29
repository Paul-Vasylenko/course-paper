import {VALUES, SUITS} from './deck.js';
import {myInterface} from './interface.js';
import {ImagineHandCard} from './imagineHandCard.js'
export class Gameprocess{
    constructor(playerOneHand,playerTwoHand,deck){
        this.deck = deck;
        this.imagineHand = [];
        this.lastused=[];
        this.playerOneHand = playerOneHand;
        this.playerTwoHand = playerTwoHand;
    }
    static rootElement = document.getElementById('root');
    //хід гравця
    playerTurn(playerOneHand,playerTwoHand){
            myInterface.addAction(`<strong>Your turn</strong><br>`)
            while(playerOneHand.cards.length<4 && this.deck.numberOfCards>0){
                const takenCard = this.playerTakeCard(playerOneHand, 'player1')
                if(playerOneHand.cards.length==4){
                    this.checkForChest(takenCard, playerOneHand, '1'); 
                }
            }
            
    
        const logs = document.querySelector(".backlog p");
    
            myInterface.addAction(`Choose a card  <select name="cardValue" size="1"  required autofocus></select>`)
            const cardChoose = logs.querySelector("select[name=cardValue]")
            cardChoose.innerHTML ="<option disabled selected></option>"
            let cardValues = playerOneHand.cardValues;
            for(let i=0;i< playerTwoHand.cards.length;i++){
                console.log(playerTwoHand.cards[i]);
            }
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
            //При виборі карти
            cardChoose.onchange = (e) => {
                e.srcElement.disabled = "true"
                choosedCard = e.srcElement.value;
                myInterface.addAction(`You choosed ${choosedCard}`)
                //Якщо вгадали карту
                if(playerTwoHand.checkCardValue(choosedCard)){
                    myInterface.addAction(`How many?  <select name="numberCards" size="1" required autofocus></select>`)
                    const numberChoose = logs.querySelector("select[name=numberCards]")
                    numberChoose.innerHTML = `
                    <option disabled selected></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    `
                    //При виборі кількості карт
                    numberChoose.onchange = (e) => {
                        e.srcElement.disabled = "true";
                        const choosedNumber = e.srcElement.value;
                        myInterface.addAction(`You choosed ${choosedNumber}`)
                        const realNumber = playerTwoHand.countNumberOfCard(choosedCard);
                        //Якщо вкгадали кількість карт
                        if((+choosedNumber)===realNumber){
                        myInterface.addAction(`Choose suits?  <select name="cardSuits" size="2" required autofocus multiple></select>`)
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
                                //коли обрали всі масті
                                if(suitsChoosed.length == choosedNumber){
                                    e.srcElement.disabled = "true";
                                    e.srcElement.size = "1";
                                    myInterface.addAction(`You choosed ${suitsChoosed.join(' ')}`)
                                    this.getEnemyCards(playerOneHand,playerTwoHand,suitsChoosed,choosedCard, 'player1');
                                    this.enemyTurn(playerOneHand,playerTwoHand);
                                }
                            }
                        }
                        }
                        else{
                        myInterface.addAction(`You didn't guess`)
                        const takenCard =this.playerTakeCard(playerOneHand, 'player1')
                        this.checkForChest(takenCard, playerOneHand,'1')
                        if(!this.imagineHand.find(item=>{
                            if(item.value==choosedCard && item.accurate == false) return item;
                        })){
                            this.imagineHand.push(new ImagineHandCard(choosedCard,false));
                        }
                        this.enemyTurn(playerOneHand,playerTwoHand);
                        }
                    }
                    
                }
                else{
                    myInterface.addAction("You didn't guess.")
                    const takenCard = this.playerTakeCard(playerOneHand, 'player1');
                    this.checkForChest(takenCard, playerOneHand,'1')
                    if(!this.imagineHand.find(item=>{
                        if(item.value==choosedCard && item.accurate == false) return item;
                    })){
                        this.imagineHand.push(new ImagineHandCard(choosedCard,false));
                    }
                    this.enemyTurn(playerOneHand,playerTwoHand);
                }
            }
            while(playerOneHand.cards.length<4 && this.deck.numberOfCards>0){
                const takenCard = this.playerTakeCard(playerTwoHand, 'player2')
                this.checkForChest(takenCard, playerTwoHand,'2'); 
            }
        
    }
    //Хід комп'ютера
    enemyTurn(playerOneHand,playerTwoHand){
        //дібрати карти якщо їх менше 4
            while(playerTwoHand.cards.length<4 && this.deck.numberOfCards>0){
                const takenCard = this.playerTakeCard(playerTwoHand, 'player2')
                this.checkForChest(takenCard, playerTwoHand,'2'); 
            }
            console.log(this.imagineHand);
            myInterface.addAction("<strong>Enemy turn</strong><br>")
            let priority = -1;
            let bestCardValue=null;
            if(this.deck.cards.length == 0){
                bestCardValue = playerTwoHand.cards[0].value;
            }
            else{
                //Обрати кращу карту
                for(let value of VALUES){
                    const newPriority = this.getCardPriority(value, playerTwoHand,'2');
                    if(priority<newPriority){
                        priority=newPriority;
                        bestCardValue = value;
                    }
                }
            }
            
            myInterface.addAction(`Ememy asked ${bestCardValue}`)
            this.addToLastUsed(bestCardValue)
            //Якщо у гравця є ця карта
            if(playerOneHand.checkCardValue(bestCardValue)){
                //вгадати кількість
                let numberToAsk
                if(this.deck.cards.length==0){
                    numberToAsk = 4 - playerTwoHand.countNumberOfCard(bestCardValue);
                }
                else{
                    numberToAsk = this.imagineHand.filter(item=>item.value==bestCardValue).length;
                    if(numberToAsk==0) numberToAsk++;
                }
                let inHand = playerTwoHand.countNumberOfCard(bestCardValue);
                while(inHand+numberToAsk>4){
                    numberToAsk--;
                }
                myInterface.addAction(`Ememy asked ${numberToAsk} cards`)
                //якщо вгадали кількість
                if(playerOneHand.countNumberOfCard(bestCardValue) == numberToAsk){
                    //Намагаємося визначити масть
                    let suitsInHand = playerTwoHand.getCardSuits(bestCardValue);
                    let suitsToAsk
                    if(this.deck.cards.length==0){
                        suitsToAsk=[];
                        for(let suit of SUITS){
                            if(!suitsInHand.includes(suit)){
                                suitsToAsk.push(suit)
                            }
                        }
                    }
                    else{
                        let suitsInImagineAccurate = this.imagineHand.map(item => {
                            if(item.value == bestCardValue && item.accurate) return item.suit
                        })
                        let suitsInImagineNot = new Set();
                        let inImagineNotArr=this.imagineHand.map(item=>{
                            if(item.value == bestCardValue && item.isNot.length!=0){
                                return item.isNot;
                            }
                        });
                        inImagineNotArr.forEach(item=>{
                            if(item){
                                for(let i=0;i<item.length;i++){
                                    suitsInImagineNot.add(item[i])
                                }
                            }
                        })
                        
                        inImagineNotArr = Array.from(suitsInImagineNot);
                        suitsToAsk = []
                        let randomSuits = new Set();
                        let suit = SUITS[0];
                            while(randomSuits.size != 4){
                                let iterator = Math.floor((Math.random()*4));
                                suit = SUITS[iterator]
                                randomSuits.add(suit)
                        }
                        randomSuits= Array.from(randomSuits);
                        for(let suit of randomSuits){
                            if(suitsInImagineAccurate.includes(suit)){
                                suitsToAsk.push(suit);
                            }
                        }
                        if(suitsToAsk.length != numberToAsk){
                            for(let suit of randomSuits){
                                if(suitsToAsk.length == numberToAsk)break;
                                else{
                                    if(!suitsInHand.includes(suit) && !inImagineNotArr.includes(suit) && !suitsToAsk.includes(suit)){
                                        suitsToAsk.push(suit)
                                    }
                                }
                            }
                        }
                        //suitsToAsk - масті, що ми запитаємо
                    }
                    
                    this.getEnemyCards(playerTwoHand,playerOneHand,suitsToAsk,bestCardValue, 'player2');
                    
                }
                else{
                    myInterface.addAction("Enemy didn't guess.")
                    if(this.imagineHand.map(item=>item.value==bestCardValue).length == 1){
                        this.imagineHand.push(new ImagineHandCard(bestCardValue,false,[]));
                    }
                    else if((this.imagineHand.map(item=>item.value==bestCardValue).length == 3) || (this.imagineHand.map(item=>item.value==bestCardValue).length == 2 && this.deck.cards.length>14)){
                        let i = this.imagineHand.findIndex((item,index)=>{
                            if(item.value==bestCardValue && item.isNot.length==0 && item.accurate==false){
                                return index
                            }
                        })
                        if(i>=0){
                            this.imagineHand.splice(i,1);
                        }
                        else{
                            i = this.imagineHand.findIndex((item,index)=>{if(item.value == bestCardValue &&  item.accurate==false) return index})
                            if(i>=0){
                                this.imagineHand.splice(i,1);
                            }
                            else{
                            i = this.imagineHand.findIndex((item,index)=>{if(item.value == bestCardValue) return index})
                            this.imagineHand.splice(i,1);
                            }
                        }
                    }else if(this.imagineHand.map(item=>item.value==bestCardValue).length == 0){
                        this.imagineHand.push(new ImagineHandCard(bestCardValue,false,[]));
                        this.imagineHand.push(new ImagineHandCard(bestCardValue,false,[]));
                    }
                    else if(this.imagineHand.map(item=>item.value==bestCardValue).length == 2){
                        this.imagineHand.push(new ImagineHandCard(bestCardValue,false,[]));
                    }
                    const takenCard = this.playerTakeCard(playerTwoHand, 'player2');
                    this.checkForChest(takenCard, playerTwoHand,'2')
                }
            }
            else{
                myInterface.addAction("Enemy didn't guess.")
                const takenCard = this.playerTakeCard(playerTwoHand, 'player2');
                this.checkForChest(takenCard, playerTwoHand,'2')
            }
            //дібрати карти
            while(playerTwoHand.cards.length<4 && this.deck.numberOfCards>0){
                const takenCard = this.playerTakeCard(playerTwoHand, 'player2')
                this.checkForChest(takenCard, playerTwoHand,'2'); 
            }
            //передати хід
            this.playerTurn(playerOneHand,playerTwoHand);
    }
    //Перевірка наявності карт в руці опонента, та забирання їх в позитивному разі.
    getEnemyCards(toHand,fromHand,suits, value, player){
        let actionText = ""
        for(let suit of suits){
            actionText+= value + suit + ", "
        }
        if(player == 'player1'){
            myInterface.addAction("Cards to be checked: "+actionText)
        }
        else{
            myInterface.addAction("Cards to be checked(enemy): "+actionText)
        }
        actionText = "";
        let counter =0;
        if(player=="player1"){
            for(let suit of suits){
                if(fromHand.checkCard(value,suit)){
                    const guessedCard = fromHand.getCard(value, suit);
                    actionText += value+suit+", "
                    counter++;
                    
                    if(!this.imagineHand.find(item=>{
                        if(item.value==value && item.accurate == true && item.isNot.length==0 && item.suit==suit) return item;
                    })){
                        this.imagineHand.push(new ImagineHandCard(value,true,[],suit))
                    }
                    toHand.addCard(guessedCard)
                    this.checkForChest(value, toHand,'1')
                }
                else{
                    if(!this.imagineHand.find(item=>{
                        if(item.value==value && item.accurate == false && item.isNot.includes(suit)) return item;
                    })){
                        this.imagineHand.push(new ImagineHandCard(value,false,[suit]));
                    }
                    
                }
            }
                
                if(counter == 0){
                    myInterface.addAction("You didn't guess");
                    const takenCard = this.playerTakeCard(toHand, 'player1')
                    this.checkForChest(takenCard, toHand,'1')
                }
                else{
                    if(counter == suits.length){
                        if(!this.imagineHand.find(item=>{
                            if(item.value==value && item.accurate == false) return item;
                        })){
                            this.imagineHand.push(new ImagineHandCard(value,false));
                        }
                        
                    }
                    myInterface.addAction("You've got cards: "+actionText)
                    if(counter < suits.length){
                    let takenCard = this.playerTakeCard(toHand, 'player1')
                    this.checkForChest(takenCard, toHand,'1')
                    }
                }
                if(this.playerOneHand.chestsArr.includes(value)){
                    for(let i=0;i<this.imagineHand.length;i++){
                        if(this.imagineHand[i].value==value){
                            this.imagineHand.splice(i,1);
                            i--;
                        }
                    }
                    for(let i=0;i<this.lastused.length;i++){
                        if(this.lastused[i]==value){
                            this.lastused.splice(i,1);
                            i--;
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
                    let i = this.imagineHand.findIndex((item,index)=>{
                        if(item.value==value && item.accurate==true && item.suit == suit){
                            return index
                        }
                    })
                    if(i>=0){
                        this.imagineHand.splice(i,1);
                    }
                    else{
                        i = this.imagineHand.findIndex((item,index)=>{
                            if(item.value==value && item.isNot.length==0){
                                return index
                            }
                        })
                        if(i>=0){
                            this.imagineHand.splice(i,1);
                        }
                        else{
                            i = this.imagineHand.findIndex((item,index)=>{
                                if(item.value==value){
                                    return index
                                }
                            })
                            this.imagineHand.splice(i,1);
                        }
                    }
                    this.checkForChest(value, toHand,'2')
                }
                else{
                    let itemIm = this.imagineHand.find(item=>{
                        if(item.value==value && item.accurate==false && item.isNot.length !=0){
                            return item;
                        }
                    })
                    if(itemIm){
                        itemIm.isNot.push(suit);
                    }else{
                        this.imagineHand.push(new ImagineHandCard(value,false,[suit]))
                    }
                        
                }
            }
                if(counter == 0){
                    myInterface.addAction("Enemy didn't guess");
                    const takenCard = this.playerTakeCard(toHand, 'player2')
                    this.checkForChest(takenCard, toHand,'2')
                }
                
                else{
                    myInterface.addAction("Enemy got cards: "+actionText)
                    if(counter < suits.length){
                    let takenCard = this.playerTakeCard(toHand, 'player2')
                    this.checkForChest(takenCard, toHand,'2')
                    }
                }
                if(this.playerTwoHand.chestsArr.includes(value)){
                    for(let i=0;i<this.imagineHand.length;i++){
                        if(this.imagineHand[i].value==value){
                            this.imagineHand.splice(i,1);
                            i--;
                        }
                    }
                    for(let i=0;i<this.lastused.length;i++){
                        if(this.lastused[i]==value){
                            this.lastused.splice(i,1);
                            i--;
                        }
                    }
                }
            myInterface.renderPlayerHand(fromHand)
            myInterface.renderEnemyHand(toHand)
        }
        
        
    }
    //початок гри
     startGame(playerOneHand,playerTwoHand){
        let result = this.playerTurn(playerOneHand,playerTwoHand)
    }
    //Взяти карти для обраного гравця
    playerTakeCard(playerHand, player){
        if(this.deck.numberOfCards>0){
            playerHand.cards.push(this.deck.takeCard())
            if(player == 'player1'){
                myInterface.renderPlayerHand(playerHand)
                myInterface.addAction(`You took a card: `+playerHand.cards[playerHand.numberOfCards-1]?.value+
                playerHand.cards[playerHand.numberOfCards-1]?.suit)
            }
            else{
                myInterface.renderEnemyHand(playerHand)
                myInterface.addAction(`Enemy took a card: ${playerHand.cards[playerHand.numberOfCards-1]?.value} ${playerHand.cards[playerHand.numberOfCards-1]?.suit}`)
            }
            myInterface.renderDeck(this.deck)
            return playerHand.cards[playerHand.cards.length-1].value;
        }
    }
    //Вибір кращої карти
    getCardPriority(cardValue, playerHand,player){
        let newPriority = 0;
        let numberInHand = playerHand.countNumberOfCard(cardValue);
        if(numberInHand==0){
            newPriority=-1;
        }
        else if(numberInHand==1){
            let cardinlastused = this.lastused.find(item => item==cardValue)
            if(cardinlastused){
                let counter=0;
                this.imagineHand.forEach(item=>{
                    if(item.value == cardValue && item.accurate==true) counter++;
                })
                if(counter==0)newPriority=0
                else if(counter==1) newPriority=1200
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
                    if(item.value == cardValue && item.accurate==true) counterAcc++;
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
                    if(item.value == cardValue && item.accurate==true) counter++;
                })
                if(counter==0)newPriority=0
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
            this.checkForChest(cardValue,playerHand,player)
        }

        return newPriority
    }
    //Перевірка на наявність скарбнички
    checkForChest(value,playerHand, player){
        let counter=0;
        playerHand.cards.forEach(item=>{
            if(item.value == value) counter++;
        })
        if(counter==4){
            playerHand.createChest(value)
            myInterface.renderChest(player,playerHand)
            if(player == '1') myInterface.renderPlayerHand(playerHand)
            else{
                myInterface.renderEnemyHand(playerHand)
            }
            myInterface.addAction(`You've got a chest from ${value}`)
            playerHand.chestsArr.push(value);
            for(let i=0;i<this.imagineHand.length;i++){
                if(this.imagineHand[i].value==value){
                    this.imagineHand.splice(i,1);
                    i--;
                }
            }
            for(let i=0;i<this.lastused.length;i++){
                if(this.lastused[i]==value){
                    this.lastused.splice(i,1);
                    i--;
                }
            }
            if(this.deck.numberOfCards ==0 && playerHand.cards.length==0){
                myInterface.status = 204;
                if(player=='1'){
                
                if(playerHand.chestsNum>=5) myInterface.showWinner('1',this.playerOneHand, this.playerTwoHand);
                else{
                    myInterface.showWinner('2',this.playerOneHand, this.playerTwoHand);
                }
            }
                else{
                    if(playerHand.chestsNum>=5) myInterface.showWinner('2',this.playerOneHand, this.playerTwoHand);
                    else{
                        myInterface.showWinner('1',this.playerOneHand, this.playerTwoHand);
                    }
                }
            }
            return true;
        }
        return false;
    }
    //запам'ятовування, що цю карту було використано в останні 3 ходи
    addToLastUsed(value){
        if(this.lastused.length<3){
            this.lastused.push(value)
        }else{
            this.lastused.shift()
            this.lastused.push(value)
        }
    }
}



