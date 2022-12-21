import { Component, Input } from '@angular/core';
import { Transfer } from 'src/app/models/transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  @Input() transfer!: Transfer;

  constructor() { }
  ngOnInit(): void {
    // if(this.request.targetId == localStorage.getItem('current-user')|| ''){
    //   this.type = "in";
    // }

  //  this.getAllAccounts();
  //  this.transferFromAcct.setValue(0);
  }

  


}
