import { Component,OnDestroy,OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlackjackService } from './services/blackjack.service';
import { cards } from './cards'
import { CardI } from './cardsI.interface'
import { ModalService } from './services/modal.service';
import { StatsService } from './services/stats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angularBlackJack';

  public isStand:boolean = false;

  public dealerIndex:number = 0;
  public playerIndex:number = 0;

  public dealerCards: CardI[] = [];
  public playerCards: CardI[] = [];
  public result: string = "";

  public dealerScore = 0;
  public playerScore = 0;
  public isNewGame:boolean = false;
  public isModalShowing:boolean = false;
  public isDeal:boolean = false
  public isEndGame:boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public _service:BlackjackService, public _modalService:ModalService, public _statsService:StatsService){ 

    //subscribe to dealer score
    this._service.$dealerScore.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { this.dealerScore = data;
      if(data >= 22){
        this.isEndGame = true;
        this.isStand = true;
        this.showModal();
      }     
    });

    //subscribe to player score
    this._service.$playerScore.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { this.playerScore = data;
    if(data >= 22){
      this.getPlayerCount();
    }else if(data === 21){
      this._service._isBlackJack.next(true);
      this._modalService._modalTitle.next("Blackjack!");
      this.showModal();
    }
    });

    //subsribe to deal indicator
    this._service.$deal.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.isDeal = data });

    //endGame subscription
    this._service.$endGame.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      this.isEndGame = data;
      if(this.isEndGame === true){
          this._service._isStand.next(false);
          this._service._dealerHandArray.next([]);
          this._service._playerHandArray.next([]);
          this._service._dealerScore.next(0)
          this._service._playerScore.next(0)
          this._service._newGame.next(false)
          this._service._deal.next(false)
        }})
      

    //check if user is choosing to stand
    this._service.$isStand.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { this.isStand = data; 
    if(this.isStand === true){
     if(this.getDealerCount() < 17){
      this.hitDealer();
     }else{
     this.showModal();
     this.checkFinalScore();
     }
 
    }});

    //has a new game began
    this._service.$deal.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.isDeal = data;
    if(this.isDeal === true){
      // this.checkDealerScore();
      // this.checkPlayerScore();
    }});

    //check dealer hand
    this._service.$dealerHand.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      this.dealerCards = data;
      if(this.isStand === true){
        //  this.checkFinalScore();
      }
    })

    //subscribe to player hand 
    this._service.$playerHand.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { 
      this.playerCards = data;
    });

    //subscribe to modal isShowing
    this._modalService.$showModal.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      this.isModalShowing = data;
    })
  };



  ngOnInit() {
    console.log('onInit');
  }

  //Unsubscribe from observables
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete()
  }



  public hitDealer(){
      let dealerCount = this.getDealerCount();      
      // Keep drawing cards until dealer's count is 17 or higher
      while (this.getDealerCount() < 17) {
        this.pushDealerCard();
      }
    
  }

  public getDealerCount() {
    let dealerScore = 0;
    let aceCount = 0;
  
    for (const card of this.dealerCards) {
      if (card.rank === 'A') {
        aceCount++;
        dealerScore += 11; // Initially, consider Ace as 11
      } else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        dealerScore += 10; // Face cards are worth 10
      } else {
        dealerScore += card.value;
      }
    }
  
    // Adjust Ace values if needed to avoid busting
    while (aceCount > 0 && dealerScore > 21) {
      dealerScore = dealerScore - 10; // Change the value of one Ace from 11 to 1
      aceCount--;
    }
  
    return dealerScore;
  }

  getPlayerCount(){
     let playerScore = 0;
     let aceCount = 0;
    for (const card of this.playerCards) {
      if (card.rank === 'A') {
        // Count the number of Aces
        aceCount++;
        playerScore += 11; // Initially, consider Ace as 11
      } else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        playerScore += 10; // Face cards are worth 10
      } else {
        playerScore += card.value;
      }
    }
  
    // Adjust Ace values if needed to avoid busting
    while (aceCount > 0 && playerScore > 21) {
      playerScore = playerScore - 10; // Change the value of one Ace from 11 to 1
      aceCount--;
    }

    if(playerScore > 21){
      this._modalService._modalTitle.next("Player Bust!");
      this.result = '';
      this.endGame();
      this.isEndGame = true;
      this.isStand = true;
      this.showModal();
    }
  
    return playerScore;

  }

  pushDealerCard(){
    this.dealerCards.push(this._service.newCard());
    this._service._dealerHandArray.next(this.dealerCards);
  }

  public checkFinalScore() {
   
    const dealerScore = this.getDealerCount();
    const playerScore = this.getPlayerCount();
  
     this.result = '';
  
    if (playerScore > 21) {
      this.result = 'Player Bust :(';

    } else if (dealerScore > 21) {
      this.result = 'Dealer Busts, You Win!';

    } else if (playerScore - dealerScore === 0) {
      this.result = 'Push';

    } else if (playerScore > dealerScore) {
      this.result = 'Player Wins';

    } else {
      this.result = 'Dealer Wins';

    }
    this._modalService._modalTitle.next(this.result)
    this.endGame();
    
  }
  
  public showModal():void{
    this._modalService._showModal.next(true);
  }


  public endGame(){
    this._modalService._showModal.next(true);
    this._service._isBlackJack.next(false);
    this._service._disabled.next(true);
    this._service._deal.next(false);
    
   
    if(this.result === 'Player Wins' || this.result === 'Dealer Busts, You Win!'){
      this._statsService.incrementGamesWon();
    }else if(this.result === 'Push'){
      this._statsService.incrementGamesPushed();

    }else{
      this._statsService.incrementGamesLost();
    }
    
  }

  changeColor(color:string):void{
    this._service._cardColor.next(color);
  }

}

