import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { Transfer } from 'src/app/models/transfer';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent {

  accountId: string = '';
  
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  @Input() accounts: Account[] = [];
  // transfer forms
  transferToAcct: FormControl = new FormControl(['']);
  transferAmount: FormControl = new FormControl(['']);
  

  constructor(private accountService: AccountService) {
    this.accountId = localStorage.getItem('current-account') || '';
  }

  ngOnInit() {

  }

  
  // makes a transfer
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
        this.submit.emit();
      }
    });
  }

}
