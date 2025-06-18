import { Pipe, type PipeTransform } from '@angular/core';
import { Game } from '../models/game';

@Pipe({
  name: 'searchfilter',
  standalone: true
})
export class SearchfilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if(!items || !searchTerm) {
			return items;
		}
   
		return items.filter((item: Game) => 
      item.date?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      item.start_at?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
			item.stadium_location?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
			item.local_team_name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
			item.nb_local_goals.toString().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
			item.visitor_team_name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      item.nb_visitor_goals.toString().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
		);
  }

}
