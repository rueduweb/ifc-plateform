import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ChampionshipComponent } from "./components/championship/championship.component";
import { TeamComponent } from "./components/team/team.component";
import { StaffComponent } from "./components/team/staff/staff.component";
import { PlayersComponent } from "./components/team/players/players.component";
import { MediaComponent } from "./components/team/media/media.component";

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