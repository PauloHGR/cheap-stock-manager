import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { WalletStock } from "./wallet-stock.model";
import { catchError, map, tap, throwError } from "rxjs";
import { WalletStockRequest } from "../stocks/add-stock-to-wallet/add-stock-to-wallet-request.model";

@Injectable({
    providedIn: 'root'
})
export class WalletStockService {
    private httpClient = inject(HttpClient);
    private walletStocks = signal<WalletStock[]>([]);
    walletStocksLoaded = this.walletStocks.asReadonly();


    getStocksFromWalletById(walletId: string){
        return this.httpClient.get<WalletStock[]>("http://localhost:5002/api/v1/WalletStock/" + walletId)
        .pipe(
            map((response) => response),
            catchError((error) => {
                console.log(error)
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
        .pipe(
            tap({
                next: (response) => { this.walletStocks.set(response); console.log(response); }
            })
        );
    }

    private updateSignal(id:string) {
        const prevWalletStocks = this.walletStocks();

        if(prevWalletStocks.some(walletStock => walletStock.id == id)){
            this.walletStocks.set(prevWalletStocks.filter(walletStock => walletStock.id != id))
        }
    }

    addStockToWallet(request: WalletStockRequest){
        return this.httpClient.post("http://localhost:5002/api/v1/WalletStock",
           request
        )
        .pipe(
            map((response) => response),
            catchError(() => {
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
        .pipe(
            tap({
                next: (response) => { console.log(response); }
            })
        );
    }

    removeStockFromWalletById(id: string){
        
        return this.httpClient.delete("http://localhost:5002/api/v1/WalletStock/" + id)
        .pipe(
            map((response) => response),
            catchError((error) => {
                console.log(error)
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
        .pipe(
            tap({
                next: (response) => { console.log(response); this.updateSignal(id)}
            })
        );
    }
    

}