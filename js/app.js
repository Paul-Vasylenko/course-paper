import {Deck, PlayerHand} from './deck.js'
import { myInterface } from './interface.js';
import {Gameprocess} from './gameProcess.js';

//Клас додатку
class App{
    constructor() {
        this.startApp();
    }
    static rootElement = document.getElementById('root');
    //метод початку гри
    startApp(){
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
            console.log(gameProcess.startGame(playerOneHand,playerTwoHand))
        })
        

        
        console.log(deck);
    }
}

export default App;