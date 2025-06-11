import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-championship',
  imports: [ReactiveFormsModule],
  templateUrl: './championship.component.html',
  styleUrl: './championship.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionshipComponent {

  gameSrv = inject(GameService);

  gameList = signal<Game[]>([]);

  gameForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    start_at:new FormControl('', [Validators.required]),
    stadium_location: new FormControl('', [Validators.required]),
    local_team_name : new FormControl('', [Validators.required]),
    visitor_team_name : new FormControl('', [Validators.required]),
    nb_local_goals: new FormControl('', [Validators.required]),
    nb_visitor_goals: new FormControl('', [Validators.required]) 
  })

  gameFieldChange(control: FormControl) {}

  touchOrDirtyInvalidAlert(formControl: FormControl) {
	  return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  gameOnSubmit() {
    this.gameForm.markAllAsTouched();
    if(this.gameForm.invalid) {
      return;
    }

    if(!this.gameForm.invalid && this.gameForm.controls.date.value &&
      this.gameForm.controls.nb_local_goals.value && this.gameForm.controls.nb_visitor_goals.value &&
      this.gameForm.controls.local_team_name.value && this.gameForm.controls.visitor_team_name.value) {
      
      let newGame: Game = {
        id: uuidv4(),
        date: this.formatDate(this.gameForm.controls.date.value),
        start_at: this.gameForm.controls.start_at.value,
        stadium_location: this.gameForm.controls.stadium_location.value,
        local_team_name : this.gameForm.controls.local_team_name.value,
        visitor_team_name : this.gameForm.controls.visitor_team_name.value,
        nb_local_goals: +this.gameForm.controls.nb_local_goals.value,
        nb_visitor_goals: +this.gameForm.controls.nb_visitor_goals.value
      };
      console.log("New game : ", newGame);
      this.addANewGame(newGame);
      this.gameList = this.gameSrv.gameItems;
      this.gameForm.reset();
    }
  }

  addANewGame(newGame: Game) {
    this.gameSrv.addAGame(newGame);
  }

  formatDate(aDate: string) {
    const date = new Date(aDate);
    const month = date.getMonth() < 10 ? '0'+(date.getMonth()+ 1) : date.getMonth()+ 1;
    const formattedDate = date.getDate() + '/' + month + '/' + date.getFullYear();
    return formattedDate;
  }


}
