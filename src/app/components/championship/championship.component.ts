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

  isModalOpen = signal(false);

  // Add Game Form
  gameForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    start_at:new FormControl('', [Validators.required]),
    stadium_location: new FormControl('', [Validators.required]),
    local_team_name : new FormControl('', [Validators.required]),
    visitor_team_name : new FormControl('', [Validators.required]),
    nb_local_goals: new FormControl(0, [Validators.required]),
    nb_visitor_goals: new FormControl(0, [Validators.required]) 
  })

  // Update Game Form
  gameUpdateForm = new FormGroup({
    id: new FormControl('', {nonNullable : true}),
    date: new FormControl('', {nonNullable : true}),
    start_at:new FormControl('', {nonNullable : true}),
    stadium_location: new FormControl('', {nonNullable : true}),
    local_team_name : new FormControl('', {nonNullable : true}),
    visitor_team_name : new FormControl('', {nonNullable : true}),
    nb_local_goals: new FormControl(0, {nonNullable : true}),
    nb_visitor_goals: new FormControl(0, {nonNullable : true})
  })

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
        nb_local_goals: this.gameForm.controls.nb_local_goals.value,
        nb_visitor_goals: this.gameForm.controls.nb_visitor_goals.value
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

  updateGame(game: Game) {
    if(game && game.id && game.date && game.start_at && game.stadium_location &&
      game.local_team_name && game.visitor_team_name && game.nb_local_goals &&
      game.nb_visitor_goals) {
      console.log('Game to update : ', game);
      // Afficher les propriétés du match dans un formulaire (Popup)
      this.gameUpdateForm.controls.id.setValue(game.id);
      this.gameUpdateForm.controls.date.setValue(this.adaptFormatDateInput(game.date));
      this.gameUpdateForm.controls.start_at.setValue(game.start_at);
      this.gameUpdateForm.controls.stadium_location.setValue(game.stadium_location);
      this.gameUpdateForm.controls.local_team_name.setValue(game.local_team_name);
      this.gameUpdateForm.controls.visitor_team_name.setValue(game.visitor_team_name);
      this.gameUpdateForm.controls.nb_local_goals.setValue(game.nb_local_goals);
      this.gameUpdateForm.controls.nb_visitor_goals.setValue(game.nb_visitor_goals);
      this.openModalOfGame();
    }
  }
  sendModifOnGame() {
    console.log(this.gameUpdateForm.value);
  
    let updateGame: Game = {
        id: this.gameUpdateForm.controls.id.value,
        date: this.formatDate(this.gameUpdateForm.controls.date.value),
        start_at: this.gameUpdateForm.controls.start_at.value,
        stadium_location: this.gameUpdateForm.controls.stadium_location.value,
        local_team_name : this.gameUpdateForm.controls.local_team_name.value,
        visitor_team_name : this.gameUpdateForm.controls.visitor_team_name.value,
        nb_local_goals: this.gameUpdateForm.controls.nb_local_goals.value,
        nb_visitor_goals: this.gameUpdateForm.controls.nb_visitor_goals.value
    };
    // méthode update du service GameService
    this.gameSrv.updateAGame(updateGame)
    this.gameList = this.gameSrv.gameItems;
  }

  deleteGame(id: string) {
    this.gameSrv.deleteAGame(id);
    this.gameList = this.gameSrv.gameItems;
  }

  openModalOfGame() {
    this.isModalOpen.set(true);
  }

  closeModalOfGame() {
    this.gameUpdateForm.reset();
    this.isModalOpen.set(false);
  }

  formatDate(aDate: string) { // yyyy-mm-dd to dd/mm/yyyy
    const date = new Date(aDate);
    const month = date.getMonth() < 10 ? '0'+(date.getMonth()+ 1) : date.getMonth()+ 1;
    const formattedDate = date.getDate() + '/' + month + '/' + date.getFullYear();
    return formattedDate;
  }

  adaptFormatDateInput(aDate: string) { // dd/mm/yyyy to yyyy-mm-dd
    const date = aDate.split("/").reverse().join("/");
    const formatDateInput = date.replaceAll('/','-');
    console.log('input date : ', formatDateInput);
    return formatDateInput;
  }


}
