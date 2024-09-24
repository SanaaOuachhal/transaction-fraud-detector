import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  public constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
  ) {
  }


   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
     setTimeout(() => {

      // @ts-ignore
      const roles: string[] = this.keycloak.getKeycloakInstance().tokenParsed.realm_access.roles;
      console.log('route', route)

      if (roles && roles.includes('admin')) {
        this.router.navigateByUrl(route.url + '/admin');
      } else {
        this.router.navigateByUrl(route.url +'/responsible');
      }

    }, 500)

    return of(true);
  }
}
