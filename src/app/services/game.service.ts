import { Injectable, signal } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

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
