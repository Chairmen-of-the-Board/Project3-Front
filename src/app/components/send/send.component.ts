import { Component, OnInit } from '@angular/core';
import { Transfer } from 'src/app/models/transfer';
import { Form, FormControl } from '@angular/forms';
import { map, Observable, reduce } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';



@Component({
  selector: 'send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  

  txnAmount: FormControl = new FormControl(['']);
  txnDescription: FormControl = new FormControl(['']);
  accountId: string = '';
  txnType: FormControl = new FormControl(['']);
  userAccount!: Account;
  
  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);

  transactionsExists: boolean = false;
  createFormOpen: boolean = false;
  accountMessage: string = '';


  //transactions: Transaction[] = [];

  // transfer vars
  transferToAcct: FormControl = new FormControl(['']);
  transferAmount: FormControl = new FormControl(['']);
  transferFormOpen: boolean = true;

  accounts: Account[] = [];





  constructor(private accountService: AccountService) { 
    this.accountId = accountService.accountId;
  }


  ngOnInit(): void {
    // this.getAccount();

  }

  openTransferForm() {
    this.transferFormOpen = true;
  }
 

  makeTransfer(amount: number, accountId: any) {
    const fromId = Number(this.accountId);
    const toId = accountId;
    const transfer = new Transfer(0, fromId, toId, amount);

    this.accountService.createTransfer(transfer).subscribe({
      next: (res) => {
        // do something with res
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => {      
        console.log("sent");
      }
    });
  }

}
