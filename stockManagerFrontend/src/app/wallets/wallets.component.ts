import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { WalletComponent } from './wallet/wallet.component';
import { WalletsService } from './wallets.service';
import { WalletStockComponent } from '../wallet-stock/wallet-stock.component';
import { CardStockComponent } from '../shared/card-stock/card-stock.component';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [WalletComponent],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.css'
})
export class WalletsComponent implements OnInit{
  private walletService = inject(WalletsService)
  error = signal<string>('');
  private destroyRef = inject(DestroyRef);
  wallets = this.walletService.loadedWallets;
  walletId = '';
  selectedWalletId = output<string>();

  ngOnInit(){
    const subscription = this.walletService.getAllAvailableWallets()
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
     
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }

  onSelectedWalletId(walletId: string){
    this.walletId = walletId;
    this.selectedWalletId.emit(walletId);
  }
}
