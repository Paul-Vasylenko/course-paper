function renderDeck(deck) {
    let deckPic = document.querySelector(".deck");
    let deckPicImg = document.createElement("img");
    deckPicImg.setAttribute('src', 'images/cardForPlayer1.png')
    let deckPicP = document.createElement("p");
    deckPicP.innerText = deck.numberOfCards;
    deckPic.appendChild(deckPicImg);
    deckPic.appendChild(deckPicP);
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


function renderPlayerHand(playerHand) {
    let playerHandDiv = document.querySelector(".playerHand");
    let playerHandUl = document.createElement("ul");
    for (let i = 1; i < playerHand.numberOfCards + 1; i++) {
        let playerHandLi = document.createElement("li");
        let playerHandCardDiv = document.createElement("div");
        playerHandCardDiv.classList.add("card")
        playerHandCardDiv.id = "card" + i;
        let playerHandCardSuitValue = document.createElement("p");
        playerHandCardSuitValue.classList.add("suitvalue");
        playerHandCardSuitValue.innerHTML = playerHand.cards[i - 1].value + "<br>" + playerHand.cards[i - 1].suit;
        let playerHandCardSuitBig = document.createElement("p");
        playerHandCardSuitBig.innerText = playerHand.cards[i - 1].suit;
        playerHandCardSuitBig.classList.add("suitBig");

        if (playerHand.cards[i - 1].suit == '♥' || playerHand.cards[i - 1].suit == '♦') {
            playerHandCardSuitValue.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--redSuit');
            playerHandCardSuitBig.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--redSuit');
        } else {
            playerHandCardSuitValue.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--blackSuit');
            playerHandCardSuitBig.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--blackSuit');
        }

        playerHandCardDiv.appendChild(playerHandCardSuitValue);
        playerHandCardDiv.appendChild(playerHandCardSuitBig);
        playerHandLi.appendChild(playerHandCardDiv);
        playerHandUl.appendChild(playerHandLi);
    }
    playerHandDiv.appendChild(playerHandUl);
}