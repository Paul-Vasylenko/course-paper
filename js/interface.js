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
    //створення  колоди, backlog та playground
    createStarter(deck) {
        let checkDeck = document.getElementsByClassName('deck');
        if(checkDeck[0]){
            checkDeck[0].remove();
        }
        let playground = createPlayground(deck)
        Interface.rootElement.append(playground)
        myInterface.renderDeck(deck);
    }
    //оновлення колоди карт
    renderDeck(deck){
        const cardsnum = deck.numberOfCards;
        if(cardsnum>0){
            document.querySelector('.deck p').innerText = cardsnum;
        }
        else{
            let deck =document.querySelector('.deck');
            if(deck){
                deck.remove();
            }
            
        }
    }
    //створення  руки гравця
    createPlayerHand(playerHand){
        const playground = document.getElementsByClassName('playground')[0];
        let playerHandDiv = createElement({
            tagName: 'div',
            className: 'playerHand'
        })
        playerHandDiv= createInnerPlayedHand(playerHand, playerHandDiv);
        playground.append(playerHandDiv)
    }
    //оновлення руки гравця
    renderPlayerHand(playerHand){
        const playerHandDiv = document.querySelector(".playerHand");
        playerHandDiv.innerHTML = "";
        createInnerPlayedHand(playerHand, playerHandDiv);
    }
    //створення  руки суперника
    createEnemyHand(playerHand){
        let enemyHandDiv = createInnerEnemyHand(playerHand);
        const playground = document.getElementsByClassName('playground')[0];
        playground.append(enemyHandDiv)
    }
    //оновлення руки суперника
    renderEnemyHand(playerHand){
        const playerHandDiv = document.querySelector(".enemyHand");
        playerHandDiv.innerHTML = "";
        createInnerEnemyHand(playerHand, playerHandDiv)
    }
    //створення початкового модального вікна
    showStartModal(onClose){
        const root = getModalContainer();
        const modal = createStartModal(onClose);
    
        root.append(modal);
    }
    //створення скарбничок
    createChest(player,playerHand){
        let chestBlock;
        let chestP = createElement({
            tagName:'p'
        })
        if(player=='1'){
                chestBlock = createElement({
                tagName: 'div',
                className: 'playerChest chest'
            })
            chestP.innerHTML = `У вас <span>${playerHand.chestsNum}</span> скарбничок`;
        }
        else if(player == '2'){
            chestBlock = createElement({
                tagName: 'div',
                className: 'enemyChest chest'
            })
            chestP.innerHTML = `У противника <span>${playerHand.chestsNum}</span> скарбничок`;
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
    //оновлення скарбничок
    renderChest(player, playerHand){
        let chestP
        if(player=='1'){
            chestP = document.querySelector('.playerChest p')   
        chestP.innerHTML = `У вас <span>${playerHand.chestsNum}</span> скарбничок`

        }
        else if(player == '2'){
        chestP = document.querySelector('.enemyChest p')
        chestP.innerHTML = `У противника <span>${playerHand.chestsNum}</span> скарбничок`
        }
    }
}

export const myInterface = new Interface();