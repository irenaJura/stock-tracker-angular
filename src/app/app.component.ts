import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { getStockDataObservable, StockTransaction, User } from './api/stockApi';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';

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
  imports: [StockTrackerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'stock-tracker';
  stockDataSource = getStockDataObservable();
  // todo: initialize
  userDataSource!: Observable<User>;
  transactionsDataSource!: Observable<StockTransaction>;
}
