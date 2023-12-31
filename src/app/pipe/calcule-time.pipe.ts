import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculeTime'
})
export class CalculeTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) { return 'à l\'instant'; }
    let time = (Date.now() - Date.parse(value)) / 1000;
    if (time < 10) {
      return 'à l\'instant';
    } else if (time < 60) {
      return 'il y a un instant';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' seconde', ' minute', ' heure', ' jour', ' mois', ' année'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = (Math.floor(time) > 1 && i !== 4) ? 's' : ''; // Pas de 's' pour "mois"
    return 'il y a ' + Math.floor(time) + string[i] + plural;
  }

}



