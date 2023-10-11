import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlackjackService } from '../services/blackjack.service';
import { CardI } from '../cardsI.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy{

  public playerCards: CardI[] = [];
  public playerStands: boolean = false;
  public disabled: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _service: BlackjackService) { 
    this._service._disabled.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { this.disabled = data; });
  }

  ngOnInit():void{
    this.getPlayerCards();
    this._service.$isStand.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      this.playerStands = data;
  })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  public getPlayerCards() {
    this._service.$playerHand.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { this.playerCards = data; console.log(this.playerCards) });
  }

}
