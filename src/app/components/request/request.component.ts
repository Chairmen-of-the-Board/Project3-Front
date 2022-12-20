import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { Transfer } from 'src/app/models/transfer';
import { UserRequest } from 'src/app/models/userrequest';
import { AccountService } from 'src/app/services/account.service';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() request!: UserRequest;
  type: string = "out";
  accounts: Account[] = [];
  transferFromAcct: FormControl = new FormControl(['']);


  constructor(private accountService: AccountService, private requestService: RequestService) { }

  ngOnInit(): void {
    if(this.request.targetId == localStorage.getItem('current-user')|| ''){
      this.type = "in";
    }
    this.getAllAccounts();
    this.transferFromAcct.setValue(0);
    
  }


  approveRequest(){   
    //return if no account selected
    if (this.transferFromAcct.value === 0) return;

     let outTransfer: Transfer = {
      id: 0,
      fromAcctId: this.transferFromAcct.value,
      toAcctId: this.request.requestAccId,
      amount: this.request.amount
     };

    let enoughMoney: boolean = false;

     for (let i of this.accounts) {

      if(i.id == this.transferFromAcct.value && i.balance >= outTransfer.amount) {
          enoughMoney = true;
          break;
      }
    }

      if (enoughMoney) {

      

      this.accountService.createTransfer(outTransfer).subscribe({
        next: (res) => {
          // do something with res

        },
        error: (e) => {
          alert(e.message);
        },
        complete: () => { 
          this.request.status = "Approved";
          this.requestService.upsertRequest(this.request).subscribe({
            next: (res) =>{
              // do something with res
            },
            error: (e) => {
              alert(e.message);
            },
            complete: () => {
              // complete
            }
          });
        }
      });
    } else {
      alert("Insufficient funds.");
    }
  }

  denyRequest(){
    //return if no account selected
    if (this.transferFromAcct.value === 0) return;

        this.request.status = "Denied";
        this.requestService.upsertRequest(this.request).subscribe({
          next: (res) =>{
            // do something with res
          },
          error: (e) => {
            alert(e.message);
          },
          complete: () => {
            console.log("Denied");
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
        console.log("Loaded in accounts for " + this.request.id);
      }
    }
    );
  }

}
