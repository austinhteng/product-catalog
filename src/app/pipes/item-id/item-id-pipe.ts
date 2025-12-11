import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemId',
  standalone: true
})
export class ItemIdPipe implements PipeTransform {

  transform(value: string | number, length: number): string {
    if (value == null) return '';
    const str = String(value);
    return str.padStart(length, '0');
  }
}