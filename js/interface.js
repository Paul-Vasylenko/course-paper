import { createElement } from "./helpers/domHelper.js";
import {createInnerPlayedHand} from './renderingHtml.js'

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
        let playground = createElement({
            tagName: 'div',
            className: 'playground'
        })
        let deckDiv = createElement({
            tagName: 'div',
            className: 'deck'
        })
        let deckPicImg = createElement({
            tagName: 'img',
            attributes:{
                src:"images/cardForPlayer1.png",
            }
        })
        let deckPicP = createElement({
            tagName: 'p'
        })
        deckPicP.innerText = deck.numberOfCards;
        deckDiv.append(deckPicImg,deckPicP);
        playground.appendChild(deckDiv)
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
}

export const myInterface = new Interface();