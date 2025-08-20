import { AfterViewInit, Component, OnInit } from '@angular/core';
import 'flowbite';
import { initFlowbite } from 'flowbite';
import { KeycloakService } from '../../../../utils/keycloak/keycloak.service';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../../services/services/events.service';
import { Router } from '@angular/router';
import { PlatinumPalcoComponent } from '../../modals/Evaclub-Map/platinum-palco/platinum-palco.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  isLoggedIn = false;
  user: any;
  hasAdminSystemRole = false;
  hasUserRole = false;

  constructor(private keycloakService: KeycloakService,
              private router: Router,
              private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    initFlowbite();
  }


  async ngOnInit() {
    this.InitScroll();
    this.InitKeycloak();
  }


  InitScroll(): void {
    const content = document.getElementById("scrollContent");
    if (content) {
      const clone = content.innerHTML;
      for (let i = 0; i < 3; i++) {
        content.innerHTML += clone;
      }
    }
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


  goToEvents() {
  const isMobile = window.innerWidth <= 768;
  this.router.navigate(['/home/events']).then(() => {
    if (isMobile) {
      this.closeSidebar();
    }
  });
  }

  closeSidebar() {
  const sidebar = document.getElementById('default-sidebar');
  if (sidebar) {
    sidebar.classList.add('-translate-x-full');
  }

  const overlay = document.querySelector('[drawer-backdrop]') as HTMLElement;
  if (overlay) {
    overlay.remove();
  }
 }

 openAddPlatinumPalco() {
     const dialogRef = this.dialog.open(PlatinumPalcoComponent, {
       width: '90vw',
      height: '90vh',
      panelClass: 'custom-modal',
     });
  }

}
