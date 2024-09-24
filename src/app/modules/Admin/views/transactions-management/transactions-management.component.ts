import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {AdminComponent} from "./admin/admin.component";
import {NgIf} from "@angular/common";
import {ResponsibleComponent} from "./responsible/responsible.component";

@Component({
  selector: 'app-transactions-management',
  standalone: true,
  imports: [
    AdminComponent,
    NgIf,
    ResponsibleComponent
  ],
  templateUrl: './transactions-management.component.html',
  styleUrl: './transactions-management.component.scss'
})
export class TransactionsManagementComponent {
  roles: string[] = [];

  constructor(private keycloak: KeycloakService) {
  }

  ngOnInit() {
    // @ts-ignore
    const roles: string[] = this.keycloak.getKeycloakInstance().tokenParsed.realm_access.roles;
    if(roles){
      this.roles = roles;
    }
  }
}
