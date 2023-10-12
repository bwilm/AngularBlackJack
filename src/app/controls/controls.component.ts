import { Component, OnDestroy,OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlackjackService } from '../services/blackjack.service';
import { CardI } from '../cardsI.interface';
import { StatsService } from '../services/stats.service';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, OnDestroy {

  public isStand:boolean = false;
  public buttonsDisabled:boolean = false;
  public newGame:boolean = false;
  public playerScore:number = 0;
  public isNewGame:boolean = false;
  public isDeal:boolean = false;
  public dealerHand:CardI[] = [];
  public playerHand:CardI[] = [];
  public isDisabled:boolean = false;
  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _service: BlackjackService, private _statsService:StatsService, private _graphService:GraphService){
    this._service.$playerScore.pipe(takeUntil(this._unsubscribeAll)).subscribe((score)=>{this.playerScore = score;});
    this._service.$dealerScore.pipe(takeUntil(this._unsubscribeAll)).subscribe((score)=>{this.playerScore = score});
    this._service._dealerHandArray.pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.dealerHand = data;
    });
    this._service._playerHandArray.pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{ 
      this.playerHand = data;
    });
    this._service.$isStand.pipe(takeUntil(this._unsubscribeAll)).subscribe((isStand)=>{this.isStand = isStand});
    this._service.$newGame.pipe(takeUntil(this._unsubscribeAll)).subscribe((isNewGame)=>{this.isNewGame = isNewGame});
    this._service.$deal.pipe(takeUntil(this._unsubscribeAll)).subscribe((isDeal)=>{this.isDeal = isDeal});
    this._service._disabled.pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{this.isDisabled = data;});

   }

  ngOnInit():void{
    console.log('control component');
  }

  ngOnDestroy(): void {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  
  }

  public hit(){
    this._service._playerScore.next(0);
    this.playerHand.push(this._service.newCard());
    this._service._playerHandArray.next(this.playerHand);
    for (let i = 0; i < this.playerHand.length; i++) {
      this.playerScore += this.playerHand[i].value;
    }
    this._service._playerScore.next(this.playerScore);
  }

  public stand() {
    this._service.stand();
  }
  
  public startNewGame(){
    this._statsService.incrementGamesPlayed();
    this._service._dealerHandArray.next([]);
    this._service._playerHandArray.next([]);
    this._service._playerScore.next(0);
    this._service._dealerScore.next(0);
    this._service._isStand.next(false);
    this._service._deal.next(true);
    this._service._disabled.next(false);
    let dealerScore = 0;
    let playerScore = 0
    for (let i = 0; i < 2; i++) {
      this.dealerHand.push(this._service.newCard());
      this.playerHand.push(this._service.newCard());
    }
    this._service._deal.next(true);
    for (let i = 0; i < this.dealerHand.length; i++) {
      dealerScore += this.dealerHand[i].value;
    }
    this._service._dealerScore.next(dealerScore)
    for (let i = 0; i < this.playerHand.length; i++) {
          playerScore += this.playerHand[i].value;
        }
    this._service._playerScore.next(playerScore);
  }


}
