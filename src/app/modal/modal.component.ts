import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BlackjackService } from '../services/blackjack.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  public isShowing:boolean = false;
  public modalType:string = "win";
  public modalTitle:string = "";
  public isBlackJack:boolean = false;
  public bgColor = '';
  public playerScore:number = 0;
  public dealerScore:number = 0;

  constructor(public _modalService: ModalService, public _service:BlackjackService, private cd: ChangeDetectorRef){

    this._modalService._showModal.subscribe(value => {
    this.isShowing = value;

   })
   this._modalService._modalTitle.subscribe(value => {
    this.modalTitle = value;
  })
   this._modalService._modalType.subscribe(value => {
    this.modalType = value;
  })
  this._service.$isBlackJack.subscribe(value => {
    this.isBlackJack = value;
  })

}
 public toggleModal(): void {
  this._modalService._showModal.next(false);
  }


}

