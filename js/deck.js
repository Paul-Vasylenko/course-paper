export const SUITS = ["♠", "♣", "♥", "♦"]
export const VALUES = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"]
//Колода карт
export class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
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
}
//клас карти, що вміщає value & suit
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}
//рука гравця
export class PlayerHand {
    // at start there are 4 cards in hand.
    constructor(deck) {
        //карти
        this.cards = [];
        //кількість скарбничок
        this.chestsNum = 0;
        //масив карт, з яких зібрано скарбничку
        this.chestsArr = [];
        //взяти 4 карти на початку
        for (let i = 0; i < 4; i++) {
            this.cards.push(takeCard(deck));
        }
    }
    //отримати кількість карт в руці
    get numberOfCards() {
        return this.cards.length;
    }
    //отримати масив значень карт
    get cardValues(){
        let cardValuesArr = this.cards.map(item => {
            return item.value
        })
        return cardValuesArr;
    }
    //перевірити чи є карта з вказаним value в руці
    checkCardValue(value){
        const found = this.cardValues.find(item => item==value)
        return found;
    }
    //визначити скільки карт з вказаним value є в руці
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
    //визначити масті карти з вказаним value в руці
    getCardSuits(value){
        return this.cards.map(item => {
            if(item.value == value){
                return item.suit
            }
        }) 
    }
    //перевірити чи є вказана карта в руці
    checkCard(value,suit){
        for(let i in this.cards){
            if(this.cards[i].value == value && this.cards[i].suit == suit){
                return true
            }
        }
    }
    //Забрати карту з руки ворога
    getCard(value,suit){
        for(let i in this.cards){
            if(this.cards[i].value == value && this.cards[i].suit == suit){
                let toReturn = this.cards[i]
                this.cards.splice(i,1);
                return toReturn;
            }
        }
    }
    //Покласти карту собі в руку
    addCard(card){
        this.cards.push(card);
    }
    //створення скарбнички
    createChest(value){
        for(let i=0;i<this.numberOfCards;i++){
            if(this.cards[i].value==value){
                this.cards.splice(i,1);
                i--;
            }
        }
        this.chestsNum++;
    }
}
//створення непотасованої, нової колоди
function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}
//взяти одну карту з колоди
export function takeCard(deck) {
    return deck.cards.length>0?deck.cards.pop():undefined;
}