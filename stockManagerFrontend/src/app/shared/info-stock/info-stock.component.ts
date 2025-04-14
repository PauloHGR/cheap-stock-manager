import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-stock',
  standalone: true,
  imports: [],
  templateUrl: './info-stock.component.html',
  styleUrl: './info-stock.component.css'
})
export class InfoStockComponent {

  ticker = input.required<string>();
}
