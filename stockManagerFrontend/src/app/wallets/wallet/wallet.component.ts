import { Component, input, output } from '@angular/core';
import { WalletModel } from '../wallet.model';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  wallet = input.required<WalletModel>();
  selectedWalletId = output<string>();

  onClickWallet(){
    console.log(this.wallet().id);
    this.selectedWalletId.emit(this.wallet().id);
  }
}
