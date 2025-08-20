import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HomePageRoutingModule } from "../../home-page-routing.module";
import { Router, RouterLink } from '@angular/router';
import { KeycloakService } from '../../../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    HomePageRoutingModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;
  user: any;

  constructor(
    private router: Router,
    private keycloakService:KeycloakService
  ){}

  ngAfterViewInit() {
  if (this.isLoggedIn) {
    initFlowbite();
  }
}

  async ngOnInit() {
      this.InitKeycloak();
    }

  async InitKeycloak() {
      this.isLoggedIn = this.keycloakService.isTokenValid;

      if (this.isLoggedIn) {
        const token = this.keycloakService.keycloak.tokenParsed;

        this.user = {
          nombre: token?.['given_name'],
          apellidoPaterno: token?.['family_name'],
          email: token?.['email'],
        };

        this.updateSidebar();
      }
    }

  updateSidebar() {
    if (this.isLoggedIn) {
      setTimeout(() => initFlowbite(), 100);
    }
  }

  goToHome() {
  const isMobile = window.innerWidth <= 768;
  this.router.navigate(['/home']).then(() => {
    if (isMobile) {
      this.closeSidebar();
    }
  });
  }

  goToZones() {
  const isMobile = window.innerWidth <= 768;
  this.router.navigate(['/home/zones']).then(() => {
    if (isMobile) {
      this.closeSidebar();
    }
  });
  }

  goToEvents() {
  const isMobile = window.innerWidth <= 768;
  this.router.navigate(['/home/events']).then(() => {
    if (isMobile) {
      this.closeSidebar();
    }
  });
  }

  goToBox() {
  const isMobile = window.innerWidth <= 768;
  this.router.navigate(['/home/box']).then(() => {
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
}
