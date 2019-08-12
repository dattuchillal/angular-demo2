import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'stringToDateFormat'
})
export class StringToDateFormatPipe implements PipeTransform {

  transform(value: number): any {
    if (value) {
      const val = value.toString();
      const dateFormatString = val.slice(0, 4) + '/' + val.slice(4, 6) + '/' + val.slice(6, 8);
      return moment(new Date(dateFormatString)).format('DD/MM/YYYY');
    }
    return null;
  }

}
