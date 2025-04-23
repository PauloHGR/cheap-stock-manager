import { Routes } from "@angular/router";
import { StocksComponent } from "./stocks/stocks.component";
import { AppComponent } from "./app.component";
import { WalletsComponent } from "./wallets/wallets.component";
import { WalletStockComponent } from "./wallet-stock/wallet-stock.component";
import { AddStockToWalletComponent } from "./stocks/add-stock-to-wallet/add-stock-to-wallet.component";
import { AuthComponent } from "./auth/auth.component";

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'stocks',
        component: StocksComponent,
        children: [
            {
                path: 'add/:ticker',
                component: AddStockToWalletComponent
            }
        ]
    },
    {
        path: 'wallets',
        component: WalletsComponent,
    },
    {
        path: 'wallet/:walletId',
        component: WalletStockComponent,
        
    },
    {
        path: 'auth',
        component: AuthComponent
    }
]