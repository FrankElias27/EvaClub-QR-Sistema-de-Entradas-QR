import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../../utils/keycloak/keycloak.service';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any;
  hasAdminSystemRole = false;
  hasUserRole = false;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
      this.InitKeycloak();
    }

  async InitKeycloak() {
      this.isLoggedIn = this.keycloakService.isTokenValid;

      if (this.isLoggedIn) {
        const token = this.keycloakService.keycloak.tokenParsed;

        const realmRoles: string[] = token?.['realm_access']?.roles || [];

        this.user = {
          nombre: token?.['given_name'],
          apellidoPaterno: token?.['family_name'],
          email: token?.['email'],
          roles: realmRoles
        };

        this.hasAdminSystemRole =
          this.user.roles.includes('ADMIN-SYSTEM') && this.user.roles.includes('USER');

        this.hasUserRole =
         this.user.roles.includes('USER') && !this.user.roles.includes('ADMIN-SYSTEM');

        this.updateNavbar();


      }
    }


  updateNavbar() {
    if (this.isLoggedIn) {
      setTimeout(() => initFlowbite(), 100);
    }
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
