import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appOnlyText]'
})
export class OnlyTextDirective {

  @Input() maxlength: number;

  constructor(private el: ElementRef) {

    this.el.nativeElement.onkeyup = () => {
      this.el.nativeElement.value = this.filterText(this.el.nativeElement.value);
    };
  }

  // tslint:disable-next-line:typedef
  filterText(value: string) {
    if (value && typeof value === 'string') {
      const pattern = /^[a-zA-Z ]* $/;
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
