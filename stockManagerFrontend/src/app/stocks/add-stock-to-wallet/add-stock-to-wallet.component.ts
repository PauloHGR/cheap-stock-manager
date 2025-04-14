import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletsService } from '../../wallets/wallets.service';
import { WalletStockService } from '../../wallet-stock/wallet-stock.service';
import { WalletStockRequest } from './add-stock-to-wallet-request.model'

@Component({
  selector: 'app-add-stock-to-wallet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-stock-to-wallet.component.html',
  styleUrl: './add-stock-to-wallet.component.css'
})
export class AddStockToWalletComponent {
  close = output();
  ticker = input.required<string>();
  private walletService = inject(WalletsService);
  private walletStockService = inject(WalletStockService);
  private destroyRef = inject(DestroyRef);
  Quantity = 0;
  WalletId = '';
  wallets = this.walletService.loadedWallets;
  error = signal<string>('');

  ngOnInit(){
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
      complete: () => { this.close.emit(); }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onCloseAddStock(){
    this.close.emit();
  }

}
