import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WalletsComponent } from './wallets/wallets.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, 
    WalletsComponent, 
    SideBarComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet],
})
export class AppComponent implements OnInit{

  wallets = signal(false);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  onClickWallet(){
    if(!this.wallets()){
      this.wallets.set(true);
    } else {
      this.wallets.set(false);
    }
    
  }
}
