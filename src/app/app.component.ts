import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';
import { getStockDataObservable, StockTransaction, User } from './api/stockApi';
import { Observable, of, from } from 'rxjs';

const user: User = {
  id: '1',
  name: 'Alex Pereir',
  joined: new Date(),
};
const transactions: StockTransaction[] = [
  {
    bought: 'APPL',
    price: 261.88,
  },
  {
    bought: 'GOOG',
    price: 188.88,
  },
  {
    bought: 'APPL',
    price: 298.45,
  },
  {
    bought: 'AMZN',
    price: 180.46,
  },
  {
    bought: 'MSFT',
    price: 508.64,
  },
  {
    bought: 'NVDA',
    price: 131.64,
  },
  {
    bought: 'MSFT',
    price: 486.65,
  },
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StockTrackerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'stock-tracker';
  stockDataSource = getStockDataObservable();
  userDataSource: Observable<User> = of(user);
  transactionsDataSource: Observable<StockTransaction> = from(transactions);
}
