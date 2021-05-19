import {Deck, PlayerHand} from './deck.js'
import { myInterface } from './interface.js';
import {Gameprocess} from './gameProcess.js';

class App{
    constructor() {
        this.startApp();
    }
    static rootElement = document.getElementById('root');
    startApp(){
        const deck = new Deck();
        deck.shuffle();
        const playerOneHand = new PlayerHand(deck);
        const playerTwoHand = new PlayerHand(deck); 
        
        myInterface.showStartModal(() => {
            myInterface.createDeck(deck);
            myInterface.createPlayerHand(playerOneHand);
            myInterface.createEnemyHand(playerTwoHand);
            myInterface.createChest('1')
            myInterface.createChest('2')
            const gameProcess = new Gameprocess(playerOneHand,playerTwoHand);
        })
        

        
        console.log(deck);
    }
}

export default App;