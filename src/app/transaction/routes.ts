import {Routes} from '@angular/router';
import {TransactionTableComponent} from "./components/transaction-table/transaction-table.component";

export const TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    component: TransactionTableComponent
  }

];

