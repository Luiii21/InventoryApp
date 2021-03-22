import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  @Input() maxlength: number;

  constructor(private el: ElementRef) {

    this.el.nativeElement.onkeyup = () => {
      this.el.nativeElement.value = this.filterNumbers(this.el.nativeElement.value);
    };
  }

  // tslint:disable-next-line:typedef
  filterNumbers(value: string) {
    if (value && typeof value === 'string') {
      const pattern = /^[0-9.]*$/;
      const arr = [];
      value.split('').forEach(n => {
        if (pattern.test(n)) {
          arr.push(n);
        }
      });
      return arr.join('');
    } else {
      return value;
    }
  }

}
