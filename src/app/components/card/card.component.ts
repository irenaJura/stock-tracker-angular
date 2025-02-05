import {
  Component,
  ContentChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';

const headerStyles = {
  marginLeft: 'calc(-1 * var(--spacing-lg)',
  marginTop: 'calc(-1 * var(--spacing-lg)',
  marginRight: 'calc(-1 * var(--spacing-lg)',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  borderBottom: '1px solid #cccccc',
  backgroundColor: '#f2f2f2',
};

@Component({
  selector: 'card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') headerElement!: ElementRef;

  ngAfterContentInit() {
    Object.assign(this.headerElement.nativeElement.style, headerStyles);
  }
}
