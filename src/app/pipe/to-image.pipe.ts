import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'toImage'
})
export class ToImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    return environment.image_url + value;
  }

}
