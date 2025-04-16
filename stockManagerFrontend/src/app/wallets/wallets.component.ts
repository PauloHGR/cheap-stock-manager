import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WalletComponent } from './wallet/wallet.component';
import { WalletsService } from './wallets.service';

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

  ngOnInit(){
    const subscription = this.walletService.getAllAvailableWallets()
    .subscribe({
      error: (e: Error) => this.error.set(e.message),
     
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }

}
