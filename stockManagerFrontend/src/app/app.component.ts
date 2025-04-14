import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WalletsComponent } from './wallets/wallets.component';
import { StocksComponent } from './stocks/stocks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, WalletsComponent, StocksComponent]
})
export class AppComponent {

  wallets = signal(false);
  stocks = signal(false);

  onClickWallet(){
    this.wallets.set(true);
    this.stocks.set(false);
  }

  onClickStock(){
    this.stocks.set(true);
    this.wallets.set(false);
  }
}
