import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription, map, filter } from 'rxjs';
import { Stock, StockTransaction, User } from '../../api/stockApi';
import { TrackedStockComponent } from '../tracked-stock/tracked-stock.component';
import { StockFilterPipe } from '../../stock-filter.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { calculatePercentDiff } from '../../util';

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
export class StockTrackerComponent implements AfterViewInit, OnInit, OnDestroy {
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
  ngOnInit() {
    const stockSubscription = this.getStockData
      .pipe(map(appendStockChange))
      .subscribe({
        next: (data: Stock[]) => (this.stockData = data),
        complete: () => (this.stockData = []),
      });

    const userSubscription = this.getUserData.subscribe(
      (data) => (this.userData = data)
    );

    const transactionsSubscription = this.getTransactionsData
      .pipe(
        filter((data) => data.price > (this.largestTransaction?.price || 0))
      )
      .subscribe((data) => (this.largestTransaction = data));

    this.stockSubscription = stockSubscription;
    this.userSubscription = userSubscription;
    this.transactionsSubscription = transactionsSubscription;
  }
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search = target.value;
  }
  ngOnDestroy() {
    this.stockSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.transactionsSubscription?.unsubscribe();
  }
}
