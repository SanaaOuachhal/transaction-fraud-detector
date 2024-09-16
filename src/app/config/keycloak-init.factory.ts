import { KeycloakService } from "keycloak-angular";
import {environment as env} from "../../environments/environment";

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: env.AUTH_SERVER.URL,
        realm: env.AUTH_SERVER.REALM,
        clientId: env.AUTH_SERVER.CLIENT_ID,
      },
      initOptions: {
        pkceMethod: 'S256',
        // must match to the configured value in keycloak
        redirectUri: 'http://localhost:4200',
        // this will solved the error
        checkLoginIframe: false
      }

    })
}
