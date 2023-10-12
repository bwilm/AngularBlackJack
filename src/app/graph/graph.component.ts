import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy, AfterViewInit {

  public winGridData:number[]=[]
  public loseGridData:number[]=[]
  public pushGridData:number[]=[]
  public playedGridData:number[]=[]
  public winGridReady:boolean = false;
  public loseGridReady:boolean = false;
  public pushGridReady:boolean = false;
  public playedGridReady:boolean = false;
  public gridData:number[]=[];
  public type:string = "winPercent";
  public showGraph:boolean = false;
  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _graphService:GraphService){

  }
  ngAfterViewInit(): void {
    this._graphService.$isGraphShowing.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.showGraph = data});
    this._graphService.getWinPercentData().pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.winGridData = data; this.winGridReady = true; console.log(this.winGridData)});
    this._graphService.getLosePercentData().pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.loseGridData = data; this.loseGridReady = true; console.log(this.loseGridData)});
    this._graphService.getPushPercentData().pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.pushGridData = data; this.pushGridReady = true; console.log(this.pushGridData)});
    this._graphService.getGamesPlayed().pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {this.playedGridData = data; this.playedGridReady = true;});
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  ngOnInit(): void {

   
  }


  toggleGraph():void{
    this.showGraph = !this.showGraph;
    console.log(this.playedGridData);
    console.log(this.winGridData);
    console.log(this.loseGridData);
    console.log(this.pushGridData);
    this._graphService.toggleGraphModal();
  }

}
