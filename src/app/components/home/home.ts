import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private authService = inject(AuthService);
  account = this.authService.getAccount();

  logout(): void {
    this.authService.logout();
  }
}