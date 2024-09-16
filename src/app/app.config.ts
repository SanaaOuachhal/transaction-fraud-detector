import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import {DropdownModule, SidebarModule} from '@coreui/angular';
import {IconSetService} from '@coreui/icons-angular';
import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./config/keycloak-init.factory";

const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}
export const appConfig: ApplicationConfig = {
  providers: [
    KeycloakInitializerProvider,
    KeycloakService,
    provideRouter(routes), provideHttpClient(),
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations()
  ]
};
