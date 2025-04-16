import { Component, input, output } from '@angular/core';
import { WalletModel } from '../wallet.model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  wallet = input.required<WalletModel>();
}
