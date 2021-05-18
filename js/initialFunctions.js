function startGame() {
    modalScreen.remove();
    const deck = new Deck();
    deck.shuffle();
    const playerHand = new PlayerHand(deck);
    const enemyHand = new PlayerHand(deck);
    console.log(deck.cards);
    console.log(playerHand.cards);
    console.log(enemyHand.cards);
    renderDeck(deck);
    renderEnemyHand(enemyHand);
    renderPlayerHand(playerHand);
}