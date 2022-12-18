import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { ChartComponent } from 'chart.js';
import { map, Observable, reduce, Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { Transfer } from 'src/app/models/transfer';
import { MoneyPipe } from 'src/app/pipes/moneypipe';
import { AccountService } from 'src/app/services/account.service';
import { RequestService } from 'src/app/services/request.service';
  

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';    

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RequestListComponent } from '../request-list/request-list.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // navigation
  currentNavSection: string = 'transactions';

  //request list child reference
  @ViewChild('requestlist') requestList!: RequestListComponent; 


  accountId: string = '';
  userAccount!: Account;
  
  // account display forms
  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);

  transactionsExists: boolean = false;
  createFormOpen: boolean = false;
  accountMessage: string = '';

  balanceStyle = {};

  @Output() transactions: Transaction[] = [];


  transferFormOpen: boolean = false;
  requestFormOpen: boolean = false;

  accounts: Account[] = [];

  //modal vars
  modalCloseResult: string = '';

  // open modal
  openModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.modalCloseResult = `Closed with: ${result}`;

      // if the form is submitted in the modal body, refresh the account in view (wait 400ms for transfer)
      if (result.includes('Submitted')) {        
        
        if (result.includes('Request')) {
          setTimeout(() => this.requestList.updateRequests(),400);
          
        }

        setTimeout(() => this.ngOnInit(),400);

       
         
      }

    }, (reason) => {
      this.modalCloseResult = `Dismissed ${this.getDismissReason(reason)}`;      
    });
  } 
  // get modal dismiss case
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  constructor(private accountService: AccountService, private modalService: NgbModal) { 
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

  navToAccountSection(section: string) {
    
    let navlinkRequests = document.getElementById("navlink-requests") as HTMLAnchorElement;
    let navlinkTransactions = document.getElementById("navlink-transactions") as HTMLAnchorElement;
    let navlinkTransfers = document.getElementById("navlink-transfers") as HTMLAnchorElement;

    navlinkRequests.setAttribute('class', 'nav-link');
    navlinkTransactions.setAttribute('class', 'nav-link');
    navlinkTransfers.setAttribute('class', 'nav-link');

    this.currentNavSection = section;

    switch(section) {
      case 'requests':
        navlinkRequests.setAttribute('class', 'nav-link active');
        break;
      case 'transactions':
        navlinkTransactions.setAttribute('class', 'nav-link active');
        break;
      case 'transfers':
        navlinkTransfers.setAttribute('class', 'nav-link active');
        break;
      default:
        //do default
        break;
    }
  }


  openCreateForm() {
    this.createFormOpen = true;
  }

  openRequestForm() {
    this.requestFormOpen = true;
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
