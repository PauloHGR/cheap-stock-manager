import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Stock } from "./stocks.model";
import { catchError, map, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private httpClient = inject(HttpClient);
    private stocks = signal<Stock[]>([]);

    loadedStocks = this.stocks.asReadonly();

    getAllAvailableStocks(){
        return this.httpClient.get<Stock[]>("http://localhost:5002/api/v1/Stock")
        .pipe(
            map((response) => response),
            catchError(() => {
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
        .pipe(tap({
            next: (response) => { this.stocks.set(response) }
        }));
    }

    getStockByTicker(ticker: string){
        return this.httpClient.get<Stock>("http://localhost:5002/api/v1/Stock/" + ticker)
        .pipe(
            map((response) => response),
            catchError(() => {
                return throwError(() => new Error('Server down. Try again later'));
            })
        );
    }

}