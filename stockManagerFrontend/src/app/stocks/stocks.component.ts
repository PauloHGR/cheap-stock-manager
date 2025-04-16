import { Component, DestroyRef, inject, signal } from '@angular/core';
import { StockService } from './stocks.service';
import { StockTableComponent } from './stock-table/stock-table.component';
import { CardStockComponent } from '../shared/card-stock/card-stock.component';
import { InfoStockComponent } from '../shared/info-stock/info-stock.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CardStockComponent, StockTableComponent, InfoStockComponent, RouterOutlet],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent {
  stockService = inject(StockService)
  error = signal<string>('');
  destroyRef = inject(DestroyRef);
  stocks = this.stockService.loadedStocks;

  ngOnInit(){
    const subscription = this.stockService.getAllAvailableStocks()
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
     
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
