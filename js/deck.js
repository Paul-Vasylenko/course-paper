export const SUITS = ["♠", "♣", "♥", "♦"]
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
        this.chestsNum = 0;
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
    checkCardValue(value){
        const found = this.cardValues.find(item => item==value)
        return found;
    }
    countNumberOfCard(value){
        let result = 0;
        this.cardValues.filter(item => {
            if(item==value){
                result++;
                return item;
            }
        });
        return result
    }
    getCardSuits(value){
        return this.cards.map(item => {
            if(item.value == value){
                return item.suit
            }
        }) 
    }
    checkCard(value,suit){
        for(let i in this.cards){
            if(this.cards[i].value == value && this.cards[i].suit == suit){
                return true
            }
        }
    }
    //get card from enemy hand
    getCard(value,suit){
        for(let i in this.cards){
            if(this.cards[i].value == value && this.cards[i].suit == suit){
                let toReturn = this.cards[i]
                this.cards.splice(i,1);
                return toReturn;
            }
        }
    }
    //put a card into your hand
    addCard(card){
        this.cards.push(card);
    }
    createChest(value){
        this.cards.forEach(item=>{
            if(item.value==value){
                this.cards.splice(i,1);
            }
        })
        this.chestsNum++;
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
    return deck.cards.length>0?deck.cards.pop():undefined;
}