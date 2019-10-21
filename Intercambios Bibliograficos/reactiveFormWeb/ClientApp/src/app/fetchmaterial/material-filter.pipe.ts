import { PipeTransform, Pipe } from '@angular/core';
import { MaterialData } from './MaterialData';

@Pipe({
  name: 'materialFilter'
  
})
export class MaterialFilterPipe implements PipeTransform {

  transform(matList: MaterialData[], searchTerm: string): MaterialData[] {
    if (!matList || !searchTerm) {
      return matList;
    }
    
    return matList.filter(mat => mat.titulo.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
