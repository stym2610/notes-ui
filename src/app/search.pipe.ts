import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(notes, searchString){
    if(!notes) return [];
    if(!searchString) return notes;

    searchString = searchString.toLowerCase();

    return notes.filter( note => { return note.value.toLowerCase().includes(searchString) });
  }

}
