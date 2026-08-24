import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private msalService = inject(MsalService);
  private router = inject(Router);

  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result?.account) {
          this.msalService.instance.setActiveAccount(result.account);
          console.log('Usuario autenticado:', result.account);
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Error procesando autenticación MSAL:', error);
      },
    });

    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      console.log('Sesión existente:', accounts[0]);
    }
  }
}