import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WalletsComponent } from './wallets/wallets.component';
import { StocksComponent } from './stocks/stocks.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WalletStockComponent } from './wallet-stock/wallet-stock.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, 
    WalletsComponent, 
    SideBarComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet]
})
export class AppComponent {

  wallets = signal(false);
  onClickWallet(){
    if(!this.wallets()){
      this.wallets.set(true);
    } else {
      this.wallets.set(false);
    }
    
  }
}
