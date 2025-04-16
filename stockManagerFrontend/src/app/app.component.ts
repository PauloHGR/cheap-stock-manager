import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WalletsComponent } from './wallets/wallets.component';
import { StocksComponent } from './stocks/stocks.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WalletComponent } from "./wallets/wallet/wallet.component";
import { WalletStockComponent } from './wallet-stock/wallet-stock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, 
    WalletsComponent, 
    StocksComponent, 
    SideBarComponent,
    WalletStockComponent]
})
export class AppComponent {

  wallets = signal(false);
  stocks = signal(false);
  walletId = '';

  onClickWallet(){
    if(!this.wallets()){
      this.wallets.set(true);
      this.stocks.set(false);
    } else {
      this.wallets.set(false);
    }
    
  }

  onClickStock(){
    this.stocks.set(true);
    this.wallets.set(false);
  }

  onGetWalletId(walletId: string){
    this.walletId = walletId
  }
}
