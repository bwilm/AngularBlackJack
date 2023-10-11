import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public gamesPlayed = 0;
  public gamesWon = 0;
  public gamesLost = 0;
  public gamesPushed = 0;
  public winPercent = 0;
  public lossPercent = 0;
  public pushPercent = 0;

  constructor(public _service:StatsService){
    this._service.$gamesPlayed.subscribe(data => {this.gamesPlayed = data});
    this._service.$gamesWon.subscribe(data => {this.gamesWon = data});
    this._service.$gamesLost.subscribe(data => {this.gamesLost = data});
    this._service.$gamesPushed.subscribe(data => {this.gamesPushed = data});
   }

   public getWinPercent():number{
    return this.winPercent;
   }

   public getLossPercent():number{
       return this.lossPercent;
  }

    public getPushPercent():number{
      return this.pushPercent;
   }

   calculateWinPercent(){
    const gamesPlayed = this.gamesPlayed;
    const gamesWon = this.gamesWon;
    
    if(gamesPlayed === 0){
      return 0;
    }else{
      return Math.round((gamesWon / gamesPlayed) * 100);
    }
  }

  calculateLossPercent(){
    const gamesPlayed = this.gamesPlayed;
    const gamesLost = this.gamesLost;
    const gamesWon = this.gamesWon;

    if(gamesPlayed === 0){
      return 0;
    }else{
      return Math.round((gamesLost / gamesPlayed) * 100);
    }
  }

  calculatePushPercent(){
    const gamesPlayed = this.gamesPlayed;
    const gamesPushed = this.gamesPushed;

    if(gamesPlayed === 0){
      return 0;
    }else{
      return Math.round((gamesPushed / gamesPlayed) * 100);
    }
  }

}
