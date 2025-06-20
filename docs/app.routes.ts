import { Routes } from '@angular/router';
import { HomeComponent } from '../src/app/components/home/home.component';
import { ChampionshipComponent } from '../src/app/components/championship/championship.component';
import { TeamComponent } from '../src/app/components/team/team.component';
import { StaffComponent } from '../src/app/components/team/staff/staff.component';
import { PlayersComponent } from '../src/app/components/team/players/players.component';
import { MediaComponent } from '../src/app/components/team/media/media.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, pathMatch: "full"
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'championship', component: ChampionshipComponent
    },
    {
        path: 'team', component: TeamComponent,
        children: [
            { path: 'staff', component: StaffComponent },
            { path: 'players', component: PlayersComponent },
            { path: 'media', component: MediaComponent }
        ]
    }
];
