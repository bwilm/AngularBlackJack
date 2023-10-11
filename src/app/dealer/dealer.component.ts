import { trigger, transition, style, animate } from '@angular/animations';
import { Component,AfterViewInit,OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlackjackService } from '../services/blackjack.service';
import { CardI } from '../cardsI.interface';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })), // Adjust the duration as needed
      ]),
    ]),
  ],
})
export class DealerComponent implements OnInit,AfterViewInit, OnDestroy {

  public dealerCards: CardI[] = [];
  public playerStands: boolean = false;
  public isNewGame:boolean = false;
  public isDeal:boolean = false;
  public fadeInAnimation = false;
  public _unsubscribeAll: Subject<any> = new Subject<any>();
  

  constructor(private _service: BlackjackService) { 
    
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit() {
    // Add the 'show' class to dealer cards after a delay
    setTimeout(() => {
      const dealerCardElements = document.querySelectorAll('.fade-in');
      dealerCardElements.forEach((element) => {
        element.classList.add('show');
      });
    }, 10000); // Adjust the delay as needed
  }

  // ... other component methods ...

  ngOnInit() {
    this.getDealerCards();
    this._service.$isStand.subscribe(data => {
      this.playerStands = data;
  })

  this._service.$newGame.subscribe(data => {this.isDeal = data;
  
  if(this.isDeal === false){
    this.resetCards();
  }});
  }

  public resetCards(){
    this._service._dealerHandArray.next([]);
  }

  public getDealerCards(){
    this.fadeInAnimation = true;
    this._service.$dealerHand.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { this.dealerCards = data;});
  }




}
