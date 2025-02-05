import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { TextColorDirective } from '../../text-color.directive';
import { Stock } from '../../api/stockApi';

@Component({
  selector: 'tracked-stock',
  standalone: true,
  templateUrl: './tracked-stock.component.html',
  styleUrl: './tracked-stock.component.css',
  imports: [CardComponent, PercentPipe, CurrencyPipe, TextColorDirective],
})
export class TrackedStockComponent {
  @Input({ required: true }) stock!: Stock;
}
