import { createElement } from "./helpers/domHelper.js";
import {createInnerPlayedHand,
        createPlayground,
        createInnerEnemyHand} from './renderingHtml.js'
import {getModalContainer, createStartModal} from './components/modal.js'


export class Interface{
    constructor(){
        this.status = 200;
        this.playerChests = 0;
        this.enemyChests = 0;
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
    createChest(player){
        let chestBlock;
        let chestP = createElement({
            tagName:'p'
        })
        if(player=='1'){
                chestBlock = createElement({
                tagName: 'div',
                className: 'playerChest chest'
            })
            chestP.innerHTML = `У вас <span>0</span> скарбничок`;
        }
        else if(player == '2'){
            chestBlock = createElement({
                tagName: 'div',
                className: 'enemyChest chest'
            })
            chestP.innerHTML = `У противника <span>0</span> скарбничок`;
        }
        
        let chestImg = createElement({
            tagName: 'img',
            attributes:{
                src:"images/chest.png",
                alt:"chest"
            }
        })
        chestBlock.append(chestP,chestImg)
        document.getElementsByClassName('playground')[0].append(chestBlock)
    }
    renderChest(player, playerHand){
        let chestP
        if(player=='1'){
            chestP = document.querySelector('.playerHand p')   
        chestP.innerHTML = `У вас <span>${playerHand.numberOfCards}</span> скарбничок`

        }
        else if(player == '2'){
        chestP = document.querySelector('.enemyHand p')
        chestP.innerHTML = `У противника <span>${playerHand.numberOfCards}</span> скарбничок`
        }
    }
}

export const myInterface = new Interface();