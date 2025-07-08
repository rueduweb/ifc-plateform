import { Injectable, signal } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  playerItems = signal<Player[]>([]);

  getAPlayer(playerId: string): Player {
    let players: any = this.playerItems;
    return players.filter((item: Player) => item.id === playerId)[0];
  }

  addAPlayer(player: Player): void {
    this.playerItems.update((items) => [...items, player]);
  }
  deleteAPlayer(playerId: string): void {
    this.playerItems.update((items) => items.filter(item => item.id !== playerId));
  }

  updateAPlayer(player: Player): void {
    this.playerItems.update((items) => items.map(item => item.id === player.id ? player : item));
  }
}
