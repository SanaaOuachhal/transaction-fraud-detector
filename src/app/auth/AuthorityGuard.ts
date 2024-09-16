import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthorityGuard implements CanActivate {

  public constructor(private readonly keycloak: KeycloakService,
                     private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const role = next.data['role'] as string;
    // @ts-ignore
    const roles: string[] = this.keycloak.getKeycloakInstance().tokenParsed.realm_access.roles;
    if (roles && roles.includes(role)) {
      return of(true);
    }
    return of(false);
  }
}
