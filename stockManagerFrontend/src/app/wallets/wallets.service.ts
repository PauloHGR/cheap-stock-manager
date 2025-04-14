import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { WalletModel } from "./wallet.model";
import { catchError, map, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WalletsService {
    private httpClient = inject(HttpClient);
    private wallets = signal<WalletModel[]>([]);

    loadedWallets = this.wallets.asReadonly();

    getAllAvailableWallets(){
        return this.getWallets("https://localhost:44368/api/v1/Wallet")
        .pipe(tap({
            next: (response) => { this.wallets.set(response); }
        })
        );
    }

    getWalletById(id: string){
        return this.httpClient.get<WalletModel>("https://localhost:44368/api/v1/Wallet/" + id)
        .pipe(
            map((response) => response),
            catchError((error) => {
                console.log(error);
                return throwError(() => new Error('Server down. Try again later'));
            })
        );
    }

    getWallets(url: string){
        return this.httpClient.get<WalletModel[]>(url)
        .pipe(
            map((response) => response),
            catchError((error) => {
                console.log(error);
                return throwError(() => new Error('Server down. Try again later'));
            })
        )
    }
}