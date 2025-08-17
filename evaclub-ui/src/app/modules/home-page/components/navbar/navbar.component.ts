import { Component } from '@angular/core';
import { KeycloakService } from '../../../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private keycloakService: KeycloakService) {}

  login() {
    this.keycloakService.login();
  }
}
