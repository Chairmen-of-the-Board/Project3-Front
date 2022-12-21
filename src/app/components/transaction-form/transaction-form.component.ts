import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {

  accountId: string = '';

  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

 // forms
  txnType: FormControl = new FormControl(['']);
  txnAmount: FormControl = new FormControl(['']);
  txnDescription: FormControl = new FormControl(['']);

  constructor(private accountService: AccountService) {
    this.accountId = localStorage.getItem('current-account') || '';
  }


  ngOnInit() {

  }

  addTransaction(amount: number, description: string, type: string) {
    const txn = new Transaction(0, amount, description, type, Date.now());
    this.accountService.createTransaction(this.accountId, txn).subscribe({
      next: () => {
        //this.accountMessage = 'New transaction was saved!';
      },
      error: () => {
       // this.accountMessage = 'New transaction was not saved...';
      },
      complete: () => {
        this.submit.emit();
       // this.getAccount();
       // this.getAllTransactions();
      }
    });
  }


}
