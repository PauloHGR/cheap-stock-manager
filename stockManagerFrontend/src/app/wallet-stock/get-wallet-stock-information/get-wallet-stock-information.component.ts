import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { WalletStock } from '../wallet-stock.model';
import { StockService } from '../../stocks/stocks.service';
import { CommonModule } from '@angular/common';
import { WalletStockService } from '../wallet-stock.service';

@Component({
  selector: 'app-get-wallet-stock-information',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './get-wallet-stock-information.component.html',
  styleUrl: './get-wallet-stock-information.component.css'
})
export class GetWalletStockInformationComponent {
  walletStock = input.required<WalletStock>();
  private stockService = inject(StockService);
  private walletStockService = inject(WalletStockService);
  private destroyRef = inject(DestroyRef);
  error = signal<string>('');
  stock = 0;
  isDeleted = signal<boolean>(false);

  ngOnInit(){
    const subscription = this.stockService.getStockByTicker(this.walletStock().ticker)
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
      next: (r) => this.stock = r.price
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }

  onRemoveStockFromWallet(id: string){
    const confirmed = confirm('Are you sure you want to remove this stock?');
    if(confirmed){
      const subscription = this.walletStockService.removeStockFromWalletById(id)
      .subscribe({
        error: (e: Error) => this.error.set(e.message),
        complete: () => { console.log('Deleted'); this.isDeleted.set(true); }
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe())
    }
  }
}
