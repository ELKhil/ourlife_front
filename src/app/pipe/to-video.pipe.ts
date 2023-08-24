import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'toVideo'
})
export class ToVideoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    return environment.video_url + value;
  }

}
