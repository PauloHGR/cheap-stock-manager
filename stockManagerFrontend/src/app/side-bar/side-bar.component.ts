import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  isAuthenticated = signal<boolean>(false);

  ngOnInit(){
  
    const subscription = this.authService.user.subscribe(u => {
      this.isAuthenticated.set(!!u);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    
  }
}
