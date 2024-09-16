import { Component } from '@angular/core';
import {TransactionTableComponent} from "./components/transaction-table/transaction-table.component";


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TransactionTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
