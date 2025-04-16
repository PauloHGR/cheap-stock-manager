import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { CardStockComponent } from '../shared/card-stock/card-stock.component';
import { Stock } from '../stocks/stocks.model';
import { InfoStockComponent } from '../shared/info-stock/info-stock.component';
import { WalletStockService } from './wallet-stock.service';
import { StockService } from '../stocks/stocks.service';
import { GetWalletStockInformationComponent } from './get-wallet-stock-information/get-wallet-stock-information.component';
import { WalletsService } from '../wallets/wallets.service';
import { WalletModel } from '../wallets/wallet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet-stock',
  imports: [CardStockComponent, InfoStockComponent, GetWalletStockInformationComponent, CommonModule],
  templateUrl: './wallet-stock.component.html',
  styleUrl: './wallet-stock.component.css'
})
export class WalletStockComponent {
  walletId = input.required<string>();
  private walletStockService = inject(WalletStockService);
  private walletService = inject(WalletsService);
  private destroyRef = inject(DestroyRef);
  error = signal<string>('');
  wallet = signal<WalletModel | undefined>(undefined);

  ngOnChanges(){
    const subscription = this.walletStockService.getStocksFromWalletById(this.walletId())
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
     
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe())

    const walletSubscription = this.walletService.getWalletById(this.walletId())
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
      next: (response) => {this.wallet.set(response);}
    })
    this.destroyRef.onDestroy(() => walletSubscription.unsubscribe())
  }

  get stocksFromWalletId(){
    return this.walletStockService.walletStocksLoaded;
  }
}
