import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'listFilter',
  pure: false
})
export class ListFilterPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean): Lista[] {

    return listas.filter( lista => lista.terminada === completada )
  }

}
