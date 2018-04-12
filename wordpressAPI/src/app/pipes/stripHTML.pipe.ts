import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHTML'
})
export class StripHTMLPipe implements PipeTransform {

    transform(text) {
        return text.replace(/<.*?>/gm, '');
       }
 
}