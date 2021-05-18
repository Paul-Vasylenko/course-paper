import { showStartModal } from './components/modal.js';
import {Deck, PlayerHand} from './deck.js'
import { createElement } from './helpers/domHelper.js';


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
        /*<div class="modalStart">
            <img src="images/message_bg.jpg" alt="">
            <p id="start">Начните игру!</p>
            <button>Start!</button>
        </div> */
        showStartModal(() => {});
        console.log(deck);
    }
}

export default App;