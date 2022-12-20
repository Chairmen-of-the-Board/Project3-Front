import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Chart from 'chart.js/auto';
import { firstValueFrom, Timestamp } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  
  public chart: any;
  public transactions: Transaction[] = [];
  accountId: string = '';


  constructor(private accountService: AccountService) {   
    // this.accountId = accountService.accountId;
    // added below line because it's more dependable than calling accountservice.accountid
    this.accountId = localStorage.getItem('current-account') || '';
  }



  async ngOnInit() {

    this.getAllTransactions();

      // SET DARK MODE
    if (localStorage.getItem('dark-theme')) {
      document.body.classList.toggle('dark-theme', true);
    } else {
      document.body.classList.toggle('dark-theme', false);
    }
        
  }

  

  getAllTransactions() { 

    
    this.accountService.getTransactions(this.accountId).subscribe({
      next: (resp) => {
        this.transactions = resp;
      },
      error: () => {
        alert('bad');
       // this.accountMessage = 'No transactions were retrieved...';
      },
      complete: () => {
        this.transactions.forEach((txn) => {
          const num = txn.amount;
          txn.amount = +num.toFixed(2);
        });
        this.transactions.reverse();
        console.log(this.transactions);


        this.createChart();

      }
    }
    );
  }

  createChart(){

  //  alert('createchart');
    let amounts: Array<number> = new Array<number>;
    let times: Array<number> = new Array<number>;
    let descriptions: Array<string> = new Array<string>;
    for (let i in this.transactions) {
      if (this.transactions[i].type === 'Expense') {
        amounts.push(this.transactions[i].amount);
        times.push(this.transactions[i].timestamp);
        descriptions.push(this.transactions[i].description);
      }
    }
    amounts.reverse();
    times.reverse();
    descriptions.reverse();


    console.log(amounts);
    

  
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: times, 
	       datasets: [
          {
            label: "Expenses",
            data: amounts,
            backgroundColor: 'red',
            
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


}
