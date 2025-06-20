import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(list: any[], args: any[]): any {
    const column = args[0]; // column name
    const sortDirection = args[1]; // asc ou desc
    var multiplier = 1;

    if(sortDirection === 'desc') {
      multiplier = -1;
    }
    let arraySorted = list.sort((a: any, b: any) => {
      if(a[column] > b[column]) {
        return 1 * multiplier;
      }
      if(a[column] < b[column]) {
        return -1 * multiplier;
      }
      return 0;
    });
    return arraySorted;
  }

}
