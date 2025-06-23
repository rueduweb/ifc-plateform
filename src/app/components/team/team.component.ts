import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
import { routeTransition } from '../../transitions/route-transition';
@Component({
  selector: 'app-team',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  animations: [routeTransition],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  route = inject(ActivatedRoute);
}
