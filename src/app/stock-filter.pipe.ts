import { Pipe, PipeTransform } from '@angular/core';
import { Stock } from './api/stockApi';

@Pipe({
  name: 'stockFilter',
  standalone: true,
})
export class StockFilterPipe implements PipeTransform {
  transform(stocks: Stock[], search: string): Stock[] {
    if (!stocks) {
      return [];
    }
    if (!search) {
      return stocks;
    }
    search = search.toLowerCase();

    return stocks.filter((stock) => {
      return (
        stock.symbol.toLowerCase().includes(search) ||
        stock.description.toLowerCase().includes(search)
      );
    });
  }
}
