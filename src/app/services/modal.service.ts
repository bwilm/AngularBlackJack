import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService implements OnInit, OnDestroy {
  
  public _showModal =new BehaviorSubject<boolean>(false)
  public _modalTitle = new BehaviorSubject<string>("");
  public _modalType = new BehaviorSubject<string>("win");
  public $showModal = this._showModal.asObservable();
  public $modalTitle = this._modalTitle.asObservable();
  public $modalType = this._modalType.asObservable();
  public isShowing:boolean = false;
  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
  }

  public toggleModal() {
  //toggle modal
  this.isShowing =!this.isShowing;
  this._showModal.next(this.isShowing);
  }

}
