import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  public gridData:number[]= [];
  public winGridData:number[] = [0,10,25,32,88];
  public loseGridData:number[] = [0,44,32,32,88];
  public pushGridData:number[] = [23,25,13,34,56];
  public playedGridData:number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12];
  public gridType:string = "winPercent";
  public isGraph = false;

  public _winPercentData =  new BehaviorSubject<number[]>([]);
  public _losePercentData = new BehaviorSubject<number[]>([]);
  public _pushPercentData = new BehaviorSubject<number[]>([]);
  public _isGraphShowing = new BehaviorSubject<boolean>(false);
  public _gamesPlayed = new BehaviorSubject<number[]>([]);


  public $winPercentData = this._winPercentData.asObservable();
  public $losePercentData = this._losePercentData.asObservable();
  public $pushPercentData = this._pushPercentData.asObservable();
  public $isGraphShowing = this._isGraphShowing.asObservable();
  public $gamesPlayed = this._gamesPlayed.asObservable();
  

  constructor() { }

  public getWinPercentData(){
    return this.$winPercentData;
  }

  public getLosePercentData(){
    return this.$losePercentData;
  }

  public getPushPercentData(){
    return this.$pushPercentData;
  }
  public getGamesPlayed(){
    return this.$gamesPlayed;
  }


  public pushGamesPlayedData(e:number){
      this.gridData.push(e);
      this._gamesPlayed.next(this.gridData);
  }
  public pushWinPercentData(e:number){
    this.winGridData.push(e);
    this._winPercentData.next(this.winGridData);
  }
  public pushLosePercentData(e:any){
    this.loseGridData.push(e);
    this._losePercentData.next(this.loseGridData);   
  }
  public pushPushPercentData(e:any){
    this.pushGridData.push(e);
    this._pushPercentData.next(this.pushGridData);
  }


  public toggleGraphModal():void{
    this.isGraph =!this.isGraph;
    this._isGraphShowing.next(this.isGraph);
  }



}
