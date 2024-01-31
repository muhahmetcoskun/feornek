import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durum'
})
export class DurumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let val=value  ==true? "Aktif" :"Pasif" 
    return val;
  }

}
