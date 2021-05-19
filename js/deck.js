const SUITS = ["♠", "♣", "♥", "♦"]
export const VALUES = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"]

export class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }
    get numberOfCards() {
        return this.cards.length;
    }
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    };
}
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

export class PlayerHand {
    // at start there are 4 cards in hand.
    constructor(deck) {
        this.cards = [];
        for (let i = 0; i < 4; i++) {
            this.cards.push(takeCard(deck));
        }
    }

    get numberOfCards() {
        return this.cards.length;
    }
    get cardValues(){
        let cardValuesArr = this.cards.map(item => {
            return item.value
        })
        return cardValuesArr;
    }
    checkCard(value){
        const found = this.cardValues.find(item => item==value)
        return found;
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}
//function to take 1 cards from the deck "deck"
export function takeCard(deck) {
    return deck.cards.pop();
}