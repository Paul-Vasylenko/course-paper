export const SUITS = ["♠", "♣", "♥", "♦"]
export const VALUES = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"]
import {Card} from './card.js'

//Колода карт
export class Deck {
    constructor(cards = this.freshDeck()) {
        this.cards = cards
    }
    //створення непотасованої, нової колоди
    freshDeck() {
        return SUITS.flatMap(suit => {
            return VALUES.map(value => {
                return new Card(suit, value)
            })
        })
    }
    //отримати кількість карт в колоді
    get numberOfCards() {
        return this.cards.length;
    }
    //тасувати колоду
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }; 
    //взяти одну карту з колоди
    takeCard() {
        return this.cards.length>0?this.cards.pop():undefined;
    }
}



