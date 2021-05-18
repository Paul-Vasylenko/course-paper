import { createElement } from "./helpers/domHelper.js";
import {createInnerPlayedHand,
        createPlayground,
        createInnerEnemyHand} from './renderingHtml.js'
import {getModalContainer, createStartModal} from './components/modal.js'


export class Interface{
    constructor(){
        this.status = 200;
    }
    static rootElement = document.getElementById('root');
    createDeck(deck) {
        let checkDeck = document.getElementsByClassName('deck');
        if(checkDeck[0]){
            checkDeck[0].remove();
        }
        let playground = createPlayground(deck)
        Interface.rootElement.append(playground)
        myInterface.renderDeck(deck);

    }
    renderDeck(deck){
        const cardsnum = deck.numberOfCards;
        if(cardsnum>0){
            document.querySelector('.deck p').innerText = cardsnum;
        }
        else{
            document.querySelector('.deck').remove();
        }
    }
    createPlayerHand(playerHand){
        const playground = document.getElementsByClassName('playground')[0];
        let playerHandDiv = createElement({
            tagName: 'div',
            className: 'playerHand'
        })
        playerHandDiv= createInnerPlayedHand(playerHand, playerHandDiv);
        playground.append(playerHandDiv)
    }
    renderPlayerHand(playerHand){
        const playerHandDiv = document.querySelector(".playerHand");
        playerHandDiv.innerHTML = "";
        createInnerPlayedHand(playerHand, playerHandDiv);
    }
    createEnemyHand(playerHand){
        let enemyHandDiv = createInnerEnemyHand(playerHand);
        const playground = document.getElementsByClassName('playground')[0];
        playground.append(enemyHandDiv)
    }
    renderEnemyHand(playerHand){
        const playerHandDiv = document.querySelector(".enemyHand");
        playerHandDiv.innerHTML = "";
        createInnerEnemyHand(playerHand, playerHandDiv)
    }
    showStartModal(onClose){
        const root = getModalContainer();
        const modal = createStartModal(onClose);
    
        root.append(modal);
    }
}

export const myInterface = new Interface();