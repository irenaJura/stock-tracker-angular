import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[textColor]',
  standalone: true,
})
export class TextColorDirective implements OnInit, OnChanges {
  @Input() textColor: string = '';

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.changeColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    const colorChange = changes['textColor'];
    if (colorChange && colorChange.currentValue !== colorChange.previousValue) {
      this.changeColor();
    }
  }

  changeColor() {
    this.element.nativeElement.style.color = this.textColor;
  }
}
