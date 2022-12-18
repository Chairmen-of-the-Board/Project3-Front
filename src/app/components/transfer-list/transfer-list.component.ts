import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Transfer } from 'src/app/models/transfer';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent {

  transfers: Transfer[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    
    this.accountService.getTransfers().subscribe(res=> {

      this.transfers = res;
    })

  }

}
