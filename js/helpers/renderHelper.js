import {createElement} from './domHelper.js';
//створення playground, колоди та backlog 
export function createPlayground(deck){
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
    let backlog = createElement({
        tagName: 'div',
        className: "backlog"
    })
    let backlogP = createElement({
        tagName: 'p',
    })
    deckPicP.innerText = deck.numberOfCards;
    deckDiv.append(deckPicImg,deckPicP);
    backlog.append(backlogP)
    playground.append(backlog)
    playground.appendChild(deckDiv)
    return playground;
}
//заповнення руки гравця картами
export function createInnerPlayedHand(playerHand,playerHandDiv){
    let playerHandUl = createElement({
        tagName: 'ul',
    })
    if(playerHand.numberOfCards<1){
        playerHandDiv.appendChild(playerHandUl);
        return playerHandDiv;
    }
    for (let i = 1; i < playerHand.numberOfCards + 1; i++) {
        let playerHandLi = createElement({
            tagName: 'li',
        })
        let playerHandCardDiv = createElement({
            tagName: 'div',
            className: "card",
            attributes:{
                id: "card"+i,
            }
        })
        let playerHandCardSuitValue = createElement({
            tagName: 'p',
            className: "suitvalue",
        })
        playerHandCardSuitValue.innerHTML = playerHand.cards[i - 1]?.value + "<br>" + playerHand.cards[i - 1]?.suit;
        let playerHandCardSuitBig = createElement({
            tagName: 'p',
            className: "suitBig",
        })
        playerHandCardSuitBig.innerText = playerHand.cards[i - 1]?.suit;
        if (playerHand.cards[i - 1]?.suit == '♥' || playerHand.cards[i - 1]?.suit == '♦') {
            playerHandCardSuitValue.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--redSuit');
            playerHandCardSuitBig.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--redSuit');
        } else {
            playerHandCardSuitValue.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--blackSuit');
            playerHandCardSuitBig.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--blackSuit');
        }

        playerHandCardDiv.append(playerHandCardSuitValue,playerHandCardSuitBig);
        playerHandLi.appendChild(playerHandCardDiv);
        playerHandUl.appendChild(playerHandLi);
}
playerHandDiv.appendChild(playerHandUl);
return playerHandDiv;

}
//заповнення руки ворога картами
export function createInnerEnemyHand(enemyHand, enemyHandDiv1){
    let enemyHandDiv = enemyHandDiv1
    if(!enemyHandDiv1){
            enemyHandDiv = createElement({
            tagName: 'div',
            className:"enemyHand"
        })
        
    }
    let enemyHandUl = createElement({
        tagName: 'ul',
    })
    if (enemyHand.numberOfCards >= 7) {
        for (let i = 1; i < 8; i++) {
            renderNumberOfCardsEnemy(enemyHandUl,i)
        }
        let enemyHandPre = createElement({
            tagName: 'pre',
        })
        let enemyHandP = createElement({
            tagName: 'p',
        })
        enemyHandP.innerHTML = `У противника <br>    <span>${enemyHand.numberOfCards}</span> карт`;
        enemyHandPre.append(enemyHandP);
        enemyHandDiv.append(enemyHandUl);
        enemyHandDiv.append(enemyHandPre);
    } else if (enemyHand.numberOfCards < 7) {
        for (let i = 1; i < enemyHand.numberOfCards+1; i++) {
        renderNumberOfCardsEnemy(enemyHandUl,i)
        }
        let enemyHandPre = createElement({
            tagName: 'pre',
        })
        let enemyHandP = createElement({
            tagName: 'p',
        })
        enemyHandP.innerHTML = `У противника <br>    <span>${enemyHand.numberOfCards}</span> карт`;
        enemyHandPre.append(enemyHandP);
        enemyHandDiv.append(enemyHandUl);
        enemyHandDiv.append(enemyHandPre);
    }
    return enemyHandDiv
}
//оновлення кількості карт ворога
function renderNumberOfCardsEnemy(enemyHandUl,i){
        let enemyHandLi = createElement({
            tagName: 'li',
            className:"card"+i
        })
        let enemyHandImg = createElement({
            tagName: 'img',
            attributes:{
                src:'images/cardForPlayer1.png'
            }
        })
        enemyHandLi.append(enemyHandImg);
        enemyHandUl.append(enemyHandLi);
    
}
//оновлення руки ворога
export function renderEnemyHand(enemyHand) {
    if (enemyHand.numberOfCards >= 7) {
        for (let i = 1; i < 8; i++) {
            let enemyHandLi = document.createElement("li");
            enemyHandLi.classList.add("card" + i.toString());
            let enemyHandImg = document.createElement("img");
            enemyHandImg.setAttribute('src', 'images/cardForPlayer1.png');
            enemyHandLi.appendChild(enemyHandImg);
            enemyHandUl.appendChild(enemyHandLi);
        }

        let enemyHandPre = document.createElement("pre");
        let enemyHandP = document.createElement("p");
        enemyHandP.innerHTML = "У противника <br>    <span>7</span> карт";
        enemyHandPre.appendChild(enemyHandP);
        enemyHandDiv.appendChild(enemyHandUl);
        enemyHandDiv.appendChild(enemyHandPre);
    } else if (enemyHand.numberOfCards < 7) {
        for (let i = 1; i < enemyHand.numberOfCards + 1; i++) {
            let enemyHandLi = document.createElement("li");
            enemyHandLi.classList.add("card" + i.toString());
            let enemyHandImg = document.createElement("img");
            enemyHandImg.setAttribute('src', 'images/cardForPlayer1.png');
            enemyHandLi.appendChild(enemyHandImg);
            enemyHandUl.appendChild(enemyHandLi);
        }
        let enemyHandPre = document.createElement("pre");
        let enemyHandP = document.createElement("p");
        enemyHandP.innerHTML = `У противника <br>    <span>${enemyHand.numberOfCards}</span> карт`;
        enemyHandPre.appendChild(enemyHandP);
        enemyHandDiv.appendChild(enemyHandUl);
        enemyHandDiv.appendChild(enemyHandPre);
    }
}
