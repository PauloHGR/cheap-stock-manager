import { Component, input, output } from '@angular/core';
import { Stock } from '../stocks.model';
import { AddStockToWalletComponent } from '../add-stock-to-wallet/add-stock-to-wallet.component';

@Component({
  selector: 'app-stock-table',
  imports: [AddStockToWalletComponent],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.css'
})
export class StockTableComponent {
  stock = input.required<Stock>();
  isAdded = false;

  onAddStock(){
    this.isAdded = true;
  }

  onCloseForm(){
    this.isAdded = false;
  }
}
