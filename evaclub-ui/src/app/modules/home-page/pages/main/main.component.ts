import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { KeycloakService } from '../../../../utils/keycloak/keycloak.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    SidebarComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

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


      }
    }

}
