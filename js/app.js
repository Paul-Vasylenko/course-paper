import {Deck} from './deck.js'
import {PlayerHand} from './PlayerHand.js'
import {myInterface} from './interface.js';
import {Gameprocess} from './gameProcess.js';

//Клас додатку
class App{
    constructor() {
        this.startApp();
    }
    static rootElement = document.getElementById('root');
    //метод початку гри
    startApp(){
        if(screen.width>=1367){
            const deck = new Deck();
            deck.shuffle();
            const playerOneHand = new PlayerHand(deck);
            const playerTwoHand = new PlayerHand(deck); 
            myInterface.showStartModal(() => {
                myInterface.createStarter(deck);
                myInterface.createPlayerHand(playerOneHand);
                myInterface.createEnemyHand(playerTwoHand);
                myInterface.createChest('1',playerOneHand)
                myInterface.createChest('2',playerTwoHand)
                const gameProcess = new Gameprocess(playerOneHand,playerTwoHand,deck);
                gameProcess.startGame(playerOneHand,playerTwoHand)
            })    
        }
        else{
            console.log('Only PC');
        }
        
        //console.log(deck);
    }
}

export default App;