import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from '../service/data.service';
import { AccountResponse } from '../models/accountResponse.model';
import { Account } from '../models/accountResponse.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  public accountResponse: AccountResponse;
  amount: number;

  constructor(private DataService: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this.DataService.getAccountDetails().subscribe(data => {
      this.accountResponse = data;

      console.log(this.accountResponse);
      // this.getTotalBalance();
    });
    
  }

  getTotalBalance():number {
    let total: number = 0;
    if(this.accountResponse && this.accountResponse.accounts) {

      for(let account of this.accountResponse.accounts) {
        total += +account.balance;
      }
      
    }
    return total;
  }

  withdrawSuccess(account: Account):void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {amount: this.amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.amount = result;
      console.log(this.amount);

      if(this.amount > 0) {
        let newAmount = +account.balance - this.amount;

        console.log(newAmount);
        if(newAmount > (-501)) {
        account.balance = newAmount.toString();
        } else {
        this.openSnackBar('The amount you are trying to withdraw is greater than your overdraft limit of R500', 'Ok');
        }
      }
    });

    alert('Success');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 50000
    });
  }
}
