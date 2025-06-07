import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChampionshipComponent } from './components/championship/championship.component';
import { TeamComponent } from './components/team/team.component';

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
        path: 'team', component: TeamComponent
    }
];
