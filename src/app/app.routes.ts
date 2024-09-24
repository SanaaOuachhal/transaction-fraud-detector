import {Routes} from '@angular/router';
import {DefaultLayoutComponent} from './layout';
//import {TRANSACTION_ROUTES} from "./transaction/routes";
import {AuthGuard} from "./auth/AuthGuard";
import {AuthorityGuard} from "./auth/AuthorityGuard";
import {
  TransactionsManagementComponent
} from "./modules/Admin/views/transactions-management/transactions-management.component";

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
      roles: ['admin','responsible']
    },
    children: [
      {
        path: 'transactions-management',
        component: TransactionsManagementComponent
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      }
  ]},
  {path: '**', redirectTo: 'dashboard'}
];
