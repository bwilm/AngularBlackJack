import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cards } from '../cards';
import { CardI } from '../cardsI.interface';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  public _dealerHandArray = new BehaviorSubject<CardI[]>([]);
  public _playerHandArray = new BehaviorSubject<CardI[]>([]);
  public _dealerScore = new BehaviorSubject<number>(0);
  public _playerScore = new BehaviorSubject<number>(0);
  public _isStand = new BehaviorSubject<boolean>(false);
  public _newGame = new BehaviorSubject<boolean>(false);
  public _deal = new BehaviorSubject<boolean>(false);
  public _endGame = new BehaviorSubject<boolean>(false);
  public _disabled = new BehaviorSubject<boolean>(false);
  public _isBlackJack = new BehaviorSubject<boolean>(false);
  public _cardColor = new BehaviorSubject<string>('teal-600');
  $dealerScore = this._dealerScore.asObservable();
  $playerScore = this._playerScore.asObservable();
  $dealerHand = this._dealerHandArray.asObservable();
  $playerHand = this._playerHandArray.asObservable();
  $isStand = this._isStand.asObservable();
  $newGame = this._newGame.asObservable();
  $deal = this._deal.asObservable();
  $endGame = this._endGame.asObservable();
  $disabled = this._disabled.asObservable();
  $isBlackJack = this._isBlackJack.asObservable();
  $cardColor = this._cardColor.asObservable();
  private nonPlayerDeck: CardI[] = [];
  private playerDeck: CardI[] = [];
  
  

  constructor() { }

  public updateDealerArray(newData: CardI[]) {
    this._dealerHandArray.next(newData);
  }

  public updatePlayerArray(newData: CardI[]) {
    this._playerHandArray.next(newData);
  }

  public updateStand(newData: boolean) {
    this._isStand.next(newData);
  }
  
  public  getRandomCardNumber(): number {
    // Generate a random number between 1 and 52
    return Math.floor(Math.random() * 52) + 1;
  }

  public pushToDealerDeck(card:CardI) {
    this.nonPlayerDeck.push(card);
    console.log(this.nonPlayerDeck);
    this._dealerHandArray.next(this.nonPlayerDeck);
  }
  public pushToPlayerDeck(card:CardI) {
    this.playerDeck.push(card);
    console.log(this.playerDeck,'playerDeck');
    this._playerHandArray.next(this.playerDeck);
  }

  public newCard(){
    const newCard = cards[this.getRandomCardNumber()-1]
    return newCard;
  }

  public deal(): void{
    this._deal.next(true);
  }

  public stand(){
    this._isStand.next(true);
    this.updateStand(true);
  }
  

}
