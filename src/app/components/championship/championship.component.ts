import { Component, signal } from '@angular/core';
import { Game } from '../../models/game';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-championship',
  imports: [ReactiveFormsModule],
  templateUrl: './championship.component.html',
  styleUrl: './championship.component.scss'
})
export class ChampionshipComponent {
  gameList = signal<Game[]>([]);

  gameForm = new FormGroup({
    date: new FormControl('', {nonNullable: true}),
    start_at:new FormControl('', {nonNullable: true}),
    stadium_location: new FormControl('', {nonNullable: true}),
    local_team_name : new FormControl('', {nonNullable: true}),
    visitor_team_name : new FormControl('', {nonNullable: true}),
    nb_local_goals: new FormControl('', {nonNullable: true}),
    nb_visitor_goals: new FormControl('', {nonNullable: true}) 
  })

  gameOnSubmit() {
    console.log(this.gameForm.value);
  }


}
