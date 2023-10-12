import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GraphService } from './graph.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  //Behavior Subjects for stats
  public _gamesPlayed = new BehaviorSubject<number>(0);
  public _gamesPushed = new BehaviorSubject<number>(0);
  public _gamesWon = new BehaviorSubject<number>(0);
  public _gamesLost = new BehaviorSubject<number>(0);

  //subscription variables
  public $gamesPlayed = this._gamesPlayed.asObservable();
  public $gamesPushed = this._gamesPushed.asObservable();
  public $gamesWon = this._gamesWon.asObservable();
  public $gamesLost = this._gamesLost.asObservable();
  
  constructor(public _graphService:GraphService ) {}

  public incrementGamesPlayed() {
    
    
    this._gamesPlayed.next(this._gamesPlayed.value + 1);
    this._graphService.pushGamesPlayedData(this._gamesPlayed.value+1);
  }

  public incrementGamesPushed() {
    this._gamesPushed.next(this._gamesPushed.value + 1);
  }

  public incrementGamesWon() {
      this._gamesWon.next(this._gamesWon.value + 1);
  }

  public incrementGamesLost() {
        this._gamesLost.next(this._gamesLost.value + 1);    
  }

 

}
