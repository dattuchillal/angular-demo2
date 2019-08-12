import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowNumericOnly]'
})
export class AllowNumericOnlyDirective {

  constructor() { }

  @HostListener('keypress', ['$event']) onKeyPress(e) {
    const value = e.target.value;
      const charCode = e.which ? e.which : e.keyCode;
      return /\d/.test(String.fromCharCode(charCode));
  }

}
