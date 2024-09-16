import {Routes} from '@angular/router';
import {AdminComponent} from "./views/admin/admin.component";
import {ResponsibleComponent} from "./views/responsible/responsible.component";
import {AuthorityGuard} from "../../auth/AuthorityGuard";

export const TRANSACTION_ROUTES: Routes = [
  {
    canActivate: [AuthorityGuard],
    data: {role: 'admin'},
    path: 'admin',
    component: AdminComponent
  },
  {
    canActivate: [AuthorityGuard],
    data: {role: 'responsible'},
    path: 'responsible',
    component: ResponsibleComponent
  }

];

