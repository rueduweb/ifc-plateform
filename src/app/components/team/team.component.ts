import { Component } from '@angular/core';
import { StaffComponent } from "./staff/staff.component";
import { PlayersComponent } from "./players/players.component";
import { MediaComponent } from "./media/media.component";
@Component({
  selector: 'app-team',
  imports: [StaffComponent, PlayersComponent, MediaComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  
}
