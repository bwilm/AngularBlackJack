import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { TrendModule } from 'ngx-trend';
import { GraphService } from '../services/graph.service';

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

  constructor(public _service:StatsService, public _graphService:GraphService){
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
      return ;
    }else{
      this._graphService.pushWinPercentData(Math.round(gamesWon / gamesPlayed * 100));
      return Math.round((gamesWon / gamesPlayed) * 100);
    }
  }

  calculateLossPercent(){
    const gamesPlayed = this.gamesPlayed;
    const gamesLost = this.gamesLost;
    const gamesWon = this.gamesWon;

    if(gamesPlayed === 0){
      return ;
    }else{
      this._graphService.pushLosePercentData(Math.round(gamesLost / gamesPlayed * 100));
      return Math.round((gamesLost / gamesPlayed) * 100);
    }
  }

  calculatePushPercent(){
    const gamesPlayed = this.gamesPlayed;
    const gamesPushed = this.gamesPushed;

    if(gamesPlayed === 0){
      return ;
    }else{
      this._graphService.pushPushPercentData(Math.round(gamesPushed / gamesPlayed * 100));
      return Math.round((gamesPushed / gamesPlayed) * 100);
    }
  }

  toggleGraph():void{
    this._graphService.toggleGraphModal();
  }

}
