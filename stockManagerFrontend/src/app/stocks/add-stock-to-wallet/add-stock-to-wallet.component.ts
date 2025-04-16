import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletsService } from '../../wallets/wallets.service';
import { WalletStockService } from '../../wallet-stock/wallet-stock.service';
import { WalletStockRequest } from './add-stock-to-wallet-request.model'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-stock-to-wallet',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-stock-to-wallet.component.html',
  styleUrl: './add-stock-to-wallet.component.css'
})
export class AddStockToWalletComponent {
  
  ticker = input.required<string>();
  private walletService = inject(WalletsService);
  private walletStockService = inject(WalletStockService);
  private destroyRef = inject(DestroyRef);
  Quantity = 0;
  WalletId = '';
  wallets = this.walletService.loadedWallets;
  error = signal<string>('');
  isAdded = signal<boolean>(false);

  ngOnInit(){
    console.log(this.ticker());
    this.walletService.getAllAvailableWallets()
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
    });
  }

  onSubmitStock(){
    const request: WalletStockRequest = {
      walletId: this.WalletId,
      ticker: this.ticker(),
      quantity: this.Quantity
    }

    const subscription = this.walletStockService.addStockToWallet(request)
    .subscribe({
      complete: () => { this.isAdded.set(true); }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
