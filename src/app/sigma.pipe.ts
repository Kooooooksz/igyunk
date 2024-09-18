import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sigma'
})
export class SigmaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} 🗿`;
  }

}
