import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
import { routeTransition } from './transitions/route-transition';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule],
  animations: [routeTransition],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ifc-plateform';
  menu = [
    'équipe', 'championnat', 'staff', 'partenaires', 'inside', 'contact'
  ];
  router = inject(Router)
  constructor(protected route: ActivatedRoute) {}
  goToTeam() {
    this.router.navigate(['/team']);
  }
}
