import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[textColor]',
  standalone: true,
})
export class TextColorDirective {
  @Input() textColor: string = '';

  constructor(private element: ElementRef) {
    this.changeColor();
  }

  // Todo: initalize text color

  // Todo: handle changes to input

  changeColor() {
    this.element.nativeElement.style.color = this.textColor;
  }
}
