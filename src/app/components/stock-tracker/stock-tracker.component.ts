import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Stock, StockTransaction, User } from '../../api/stockApi';
import { StockFilterPipe } from '../../stock-filter.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { calculatePercentDiff } from '../../util';
import { TrackedStockComponent } from '../tracked-stock/tracked-stock.component';

function appendStockChange(data: Stock[]): Stock[] {
  return data.map((stock) => ({
    ...stock,
    change: calculatePercentDiff(stock.currentPrice, stock.open),
  }));
}

@Component({
  selector: 'stock-tracker',
  standalone: true,
  templateUrl: './stock-tracker.component.html',
  imports: [TrackedStockComponent, StockFilterPipe, DatePipe, CurrencyPipe],
  styleUrl: './stock-tracker.component.css',
})
export class StockTrackerComponent implements AfterViewInit {
  @ViewChild('searchInput') searchElement!: ElementRef;
  @Input({ required: true }) getStockData!: Observable<Stock[]>;
  @Input({ required: true }) getUserData!: Observable<User>;
  @Input({ required: true }) getTransactionsData!: Observable<StockTransaction>;
  search = '';
  stockData: Stock[] = [
    {
      symbol: 'EXPL',
      currentPrice: 1.1,
      open: 1,
      low: 1,
      high: 1.1,
      description: 'Example',
      change: 0.1,
    },
  ];
  userData: User | undefined;
  largestTransaction?: StockTransaction;
  stockSubscription?: Subscription;
  userSubscription?: Subscription;
  transactionsSubscription?: Subscription;

  ngAfterViewInit() {
    if (this.stockData.length) {
      this.searchElement.nativeElement.focus();
    }
  }
  // Todo: subscribe to stockSubscription
  // Todo: subscribe to userSubscription

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search = target.value;
  }
}
