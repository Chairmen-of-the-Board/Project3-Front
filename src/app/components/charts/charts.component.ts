import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
  @Input() expanded: boolean = false;
  @Input() type: any;
  @Input() transactions: Transaction[] = [];
  accountId: string = '';


  constructor(private accountService: AccountService) {   
    // this.accountId = accountService.accountId;
    // added below line because it's more dependable than calling accountservice.accountid
    this.accountId = localStorage.getItem('current-account') || '';
  }



   public ngOnInit() {

    this.getAllTransactions();

      // SET DARK MODE
    if (localStorage.getItem('dark-theme') =='true') {
      document.body.classList.toggle('dark-theme', true);
    } else {
      document.body.classList.toggle('dark-theme', false);
    }
        
  }

  public OnChanges() {
    this.getAllTransactions();
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
    let expenseAmounts: Array<string> = new Array<string>;
    let expenseTimes: Array<string> = new Array<string>;
    let expenseDescriptions: Array<string> = new Array<string>;

    
    let incomeAmounts: Array<string> = new Array<string>;
    let incomeTimes: Array<string> = new Array<string>;
    let incomeDescriptions: Array<string> = new Array<string>;

    
    let allAmounts: Array<string> = new Array<string>;
    let allTimes: Array<string> = new Array<string>;
    let allDescriptions: Array<string> = new Array<string>;

    for (let i in this.transactions) {

      if (this.transactions[i].type == 'Income') {
        incomeAmounts.push(this.transactions[i].amount +'');
        incomeTimes.push(this.transactions[i].timestamp.substring(0,10));
        incomeDescriptions.push(this.transactions[i].description + '\n' + this.transactions[i].timestamp.substring(0,10));
      } else if (this.transactions[i].type == 'Expense') {
        expenseAmounts.push(this.transactions[i].amount + '');
        expenseTimes.push(this.transactions[i].timestamp.substring(0,10));
        expenseDescriptions.push(this.transactions[i].description + '\n' + this.transactions[i].timestamp.substring(0,10));
      }
      allAmounts.push(this.transactions[i].amount + '');
      allTimes.push(this.transactions[i].timestamp.substring(0,10));
      allDescriptions.push(this.transactions[i].description + '\n' + this.transactions[i].timestamp.substring(0,10));

    }

    if (this.type == 'Income') {
      incomeAmounts.reverse();
      incomeTimes.reverse();
      incomeDescriptions.reverse();
    } else if (this.type == 'Expense') {
      expenseAmounts.reverse();
      expenseTimes.reverse();
      expenseDescriptions.reverse();
    } 

    if (this.type == 'Expense' || this.type == 'Income') {
    
      this.chart = new Chart("MyChart", {
        type: 'line', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: (this.type == 'Income'? incomeDescriptions: expenseDescriptions), 
          datasets: [
            {
              label: this.type,
              data: (this.type == 'Income'? incomeAmounts: expenseAmounts),
              backgroundColor: (this.type == 'Income'? 'green':'red'),
              
            }
          ]
        },
        options: {
          aspectRatio:2.5
        }
        
      });
    } else {
        this.chart = new Chart("MyChart", {
        type: 'line', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: allTimes,
          datasets: [
            {
              label: "Income",
              data: incomeAmounts,
              backgroundColor: 'green',
              
            },
            {
              label: "Expense",
              data: expenseAmounts,
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


}
