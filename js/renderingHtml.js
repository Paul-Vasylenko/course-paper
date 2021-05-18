import {createElement} from './helpers/domHelper.js';

export function createInnerPlayedHand(playerHand,playerHandDiv){
    let playerHandUl = createElement({
        tagName: 'ul',
    })
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
        playerHandCardSuitValue.innerHTML = playerHand.cards[i - 1].value + "<br>" + playerHand.cards[i - 1].suit;
        let playerHandCardSuitBig = createElement({
            tagName: 'p',
            className: "suitBig",
        })
        playerHandCardSuitBig.innerText = playerHand.cards[i - 1].suit;
        if (playerHand.cards[i - 1].suit == '♥' || playerHand.cards[i - 1].suit == '♦') {
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

function renderEnemyHand(enemyHand) {
    let enemyHandDiv = document.querySelector(".enemyHand");
    let enemyHandUl = document.createElement("ul");
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
