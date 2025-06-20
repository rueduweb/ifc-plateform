import { Injectable, signal } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  lastGameItems = signal<Game[]>([
    {
      id: "1",
      date: new Date("2024-09-21"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "L'Union Saint Moulaga",
      nb_local_goals: 3,
      nb_visitor_goals: 2
    },
    {
      id: "2",
      date: new Date("2024-09-28"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Los Pastagondos A",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 9,
      nb_visitor_goals: 1
    },
    {
      id: "3",
      date: new Date("2024-10-05"),
      start_at: "20:00",
      stadium_location: "Stade Paul Faber",
      local_team_name : "UFC Paris 17",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 9,
      nb_visitor_goals: 5
    },
    {
      id: "4",
      date: new Date("2024-10-12"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Babel 7",
      nb_local_goals: 1,
      nb_visitor_goals: 7
    },
    {
      id: "5",
      date: new Date("2024-10-26"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Brimborion FC",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 4,
      nb_visitor_goals: 4
    },
    {
      id: "6",
      date: new Date("2024-11-02"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Brimborion FC",
      nb_local_goals: 2,
      nb_visitor_goals: 2
    },
    {
      id: "7",
      date: new Date("2024-11-16"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Olympique Libanais",
      nb_local_goals: 3,
      nb_visitor_goals: 5
    },
    {
      id: "8",
      date: new Date("2024-11-23"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Panatrece",
      nb_local_goals: 4,
      nb_visitor_goals: 4
    },
    {
      id: "9",
      date: new Date("2024-11-30"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "FC Paris Clichy C",
      nb_local_goals: 2,
      nb_visitor_goals: 9
    },
    {
      id: "10",
      date: new Date("2024-12-07"),
      start_at: "20:00",
      stadium_location: "Forfait",
      local_team_name : "FC Velpeau",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 3,
      nb_visitor_goals: 0
    },
    {
      id: "11",
      date: new Date("2024-12-14"),
      start_at: "19:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Occitan FC",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 3,
      nb_visitor_goals: 2
    },
    {
      id: "12",
      date: new Date("2024-12-19"),
      start_at: "19:00",
      stadium_location: "Forfait",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Saumon Gravlax",
      nb_local_goals: 3,
      nb_visitor_goals: 0
    },
    {
      id: "13",
      date: new Date("2024-12-25"),
      start_at: "20:00",
      stadium_location: "Forfait",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Footyx FC",
      nb_local_goals: 3,
      nb_visitor_goals: 0
    },
    {
      id: "14",
      date: new Date("2025-01-11"),
      start_at: "20:00",
      stadium_location: "Forfait",
      local_team_name : "Saumon Gravlax",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 0,
      nb_visitor_goals: 3
    },
    {
      id: "15",
      date: new Date("2025-01-18"),
      start_at: "20:00",
      stadium_location: "Forfait",
      local_team_name : "Footyx FC",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 0,
      nb_visitor_goals: 3
    },
    {
      id: "16",
      date: new Date("2025-02-22"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Occitan FC",
      nb_local_goals: 5,
      nb_visitor_goals: 5
    },
    {
      id: "17",
      date: new Date("2025-03-08"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "FC Velpeau",
      nb_local_goals: 2,
      nb_visitor_goals: 2
    },
    {
      id: "18",
      date: new Date("2025-03-22"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Gotham FC",
      nb_local_goals: 5,
      nb_visitor_goals: 4
    },
    {
      id: "19",
      date: new Date("2025-03-29"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "L'Union Saint Moulaga",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 2,
      nb_visitor_goals: 2
    },
    {
      id: "20",
      date: new Date("2025-04-12"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "FC Paris Clichy C",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 5,
      nb_visitor_goals: 3
    },
    {
      id: "21",
      date: new Date("2025-04-26"),
      start_at: "19:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Olympique Libanais",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 4,
      nb_visitor_goals: 2
    },
    {
      id: "22",
      date: new Date("2025-05-03"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "Los Pastagondos A",
      nb_local_goals: 3,
      nb_visitor_goals: 4
    },
    {
      id: "23",
      date: new Date("2025-05-10"),
      start_at: "19:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Panatrece",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 4,
      nb_visitor_goals: 4
    },
    {
      id: "24",
      date: new Date("2025-05-17"),
      start_at: "20:00",
      stadium_location: "Stade Léon Biancotto",
      local_team_name : "IFC Génération Impact",
      visitor_team_name : "UFC Paris 17",
      nb_local_goals: 4,
      nb_visitor_goals: 6
    },
    {
      id: "25",
      date: new Date("2025-05-24"),
      start_at: "20:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Gotham FC",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 1,
      nb_visitor_goals: 6
    },
    {
      id: "26",
      date: new Date("2025-05-31"),
      start_at: "19:00",
      stadium_location: "Complexe Lenglen",
      local_team_name : "Babel 7",
      visitor_team_name : "IFC Génération Impact",
      nb_local_goals: 4,
      nb_visitor_goals: 4
    }
  ]);

  gameItems = signal<Game[]>([]);

  addAGame(game: Game) {
    this.gameItems.update((items) => [...items, game]);
  }
  deleteAGame(gameId: string) {
    this.gameItems.update((items) => items.filter(item => item.id !== gameId));
  }
  updateAGame(game: Game) {
    this.gameItems.update((items) => items.map(item => item.id === game.id ? game : item));
  }
}
