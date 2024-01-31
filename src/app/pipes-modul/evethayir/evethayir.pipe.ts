import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evethayir'
})
export class EvethayirPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let val=value  ==true? "Evet" :"Hayır" 
    return val;
  }

}
