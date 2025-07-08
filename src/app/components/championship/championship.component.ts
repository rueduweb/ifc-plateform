import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { SearchfilterPipe } from '../../pipes/searchfilter.pipe';
import { SortPipe } from '../../pipes/sort.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-championship',
  imports: [
    ReactiveFormsModule, NgClass, FormsModule, NgxPaginationModule,
    SearchfilterPipe, SortPipe, DatePipe
],
  templateUrl: './championship.component.html',
  styleUrl: './championship.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionshipComponent {

  gameSrv = inject(GameService);

  lastGames = this.gameSrv.lastGameItems;

  gameList = signal<Game[]>([]);

  tabs: any = [
    { id: 1, label: '2025-2026' },
    { id: 2, label: '2024-2025' }
  ]
  tabSelected: number = 1;

  isModalOpen = signal(false);
  isLastSeason = signal(false);
  displaySearch = signal(false);

  searchTerm: string = '';
  sortByParam: string = '';
  sortDirection = 'asc';
  arrowDisplay = false;

  itemsPerPage: number = 8;
  currentPage: number = 1;

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
        date: new Date(this.gameForm.controls.date.value),
        start_at: this.gameForm.controls.start_at.value,
        stadium_location: this.gameForm.controls.stadium_location.value,
        local_team_name : this.gameForm.controls.local_team_name.value,
        visitor_team_name : this.gameForm.controls.visitor_team_name.value,
        nb_local_goals: this.gameForm.controls.nb_local_goals.value,
        nb_visitor_goals: this.gameForm.controls.nb_visitor_goals.value
      };
      
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
      
      // Afficher les propriétés du match dans un formulaire (Popup)
      this.gameUpdateForm.controls.id.setValue(game.id);
      this.gameUpdateForm.controls.date.setValue(game.date.toString());
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
        date: new Date(this.gameUpdateForm.controls.date.value),
        start_at: this.gameUpdateForm.controls.start_at.value,
        stadium_location: this.gameUpdateForm.controls.stadium_location.value,
        local_team_name : this.gameUpdateForm.controls.local_team_name.value,
        visitor_team_name : this.gameUpdateForm.controls.visitor_team_name.value,
        nb_local_goals: this.gameUpdateForm.controls.nb_local_goals.value,
        nb_visitor_goals: this.gameUpdateForm.controls.nb_visitor_goals.value
    };
    // méthode update du service GameService
    this.gameSrv.updateAGame(updateGame);
    this.gameList = this.gameSrv.gameItems;
  }

  deleteGame(id: string) {
    this.gameSrv.deleteAGame(id);
    this.gameList = this.gameSrv.gameItems;
  }

  // ==== Modal actions ==== //
  openModalOfGame() {
    this.isModalOpen.set(true);
  }

  closeModalOfGame() {
    this.gameUpdateForm.reset();
    this.isModalOpen.set(false);
  }

  // ==== Manage Tabs ==== //
  selectTab(tabId: number): void {
    this.tabSelected = tabId;

    if(this.tabs[tabId]?.id === 2) {
      this.isLastSeason.set(false);
      this.displaySearch.set(false);
    } else {
      this.isLastSeason.set(true);
      this.displaySearch.set(true);
    }
  }

  // Manage sort direction
  onSortDirection(param: string) {
    this.sortByParam = param;
    if(this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
      this.arrowDisplay = true;
    } else {
      this.sortDirection = 'desc';
      this.arrowDisplay = false;
    }
  }
  
}
