import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { ChartComponent } from 'chart.js';
import { map, Observable, reduce } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { Transfer } from 'src/app/models/transfer';
import { MoneyPipe } from 'src/app/pipes/moneypipe';
import { AccountService } from 'src/app/services/account.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  

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

  balanceStyle = {};

  @Output() transactions: Transaction[] = [];

  // transfer vars
  transferToAcct: FormControl = new FormControl(['']);
  transferAmount: FormControl = new FormControl(['']);
  transferFormOpen: boolean = false;

  accounts: Account[] = [];

  constructor(private accountService: AccountService) { 
    // this.accountId = accountService.accountId;
    // added below line because it's more dependable than calling accountservice.accountid
    this.accountId = localStorage.getItem('current-account') || '';
  }

  ngOnInit(): void {
    this.getAccount();
    this.getAllTransactions();

    // for transfers, get all accounts
    this.getAllAccounts();

    

  }



  addTransaction(amount: number, description: string, type: string) {
    const txn = new Transaction(0, amount, description, type, Date.now());
    this.accountService.createTransaction(this.accountId, txn).subscribe({
      next: () => {
        this.accountMessage = 'New transaction was saved!';
      },
      error: () => {
        this.accountMessage = 'New transaction was not saved...';
      },
      complete: () => {
        this.getAccount();
        this.getAllTransactions();
      }
    });
  }

  openCreateForm() {
    this.createFormOpen = true;
  }


  getAllTransactions() {
    this.accountService.getTransactions(this.accountId).subscribe({
      next: (resp) => {
        this.transactions = resp;
      },
      error: () => {
        this.accountMessage = 'No transactions were retrieved...';
      },
      complete: () => {
        this.transactions.forEach((txn) => {
          const num = txn.amount;
          txn.amount = +num.toFixed(2);
        });
        this.transactions.reverse();
      }
    }
    );
  }

  getAccount() {
    this.accountService.getAccount().subscribe({
      next: (response) => {
        this.userAccount = new Account(
          response.id,
          response.name,
          response.balance,
          response.description,
          response.creationDate
        );
        this.accountId = ''+response.id;
      },
      error: () => {
        this.accountMessage = "No account was found, please create one!"
      },
      complete: () => {
        this.accountMessage = "Account was successfully retrieved from the database.";
        const num = this.userAccount.balance;
        this.userAccount.balance = +num.toFixed(2);

        if(num < 0) {
          this.balanceStyle = {
            color: '#ff0000'
          }
        } else {
          this.balanceStyle = {
            color: '#5dff5d'
          }
        }

        this.accountName.setValue(this.userAccount.name);
        this.balance.setValue(this.userAccount.balance);
        this.accountDescription.setValue(this.userAccount.description);
        
      }
    });
  }

  // transfer stuff
  
  openTransferForm() {
    this.transferFormOpen = true;
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
        this.getAccount();
      }
    });
  }



  getAllAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (resp) => {
        this.accounts = resp;
      },
      error: () => {
       // this.accountMessage = 'No transactions were retrieved...';
       console.log("Error retrieving accounts");
      },
      complete: () => {
        
        this.accounts.forEach( (acct, index) => {
          // cuts the current account out of the transfer-to list (ref the localstorage currentaccount var)
          if(acct.id.toString() === localStorage.getItem('current-account')) this.accounts.splice(index,1);
        });


      }
    }
    );
  }




}
