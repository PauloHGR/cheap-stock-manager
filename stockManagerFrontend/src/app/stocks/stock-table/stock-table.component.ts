import { Component, input } from '@angular/core';
import { Stock } from '../stocks.model';
import { AddStockToWalletComponent } from '../add-stock-to-wallet/add-stock-to-wallet.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-table',
  imports: [RouterLink],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.css'
})
export class StockTableComponent {
  stock = input.required<Stock>();

}
