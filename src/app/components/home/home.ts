import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  account = this.authService.getAccount();
  mensajeApi: string = '';

  logout(): void {
    this.authService.logout();
  }

  llamarApi(): void {
    this.http.get('http://localhost:8081/api/ordenes', { responseType: 'text' })
      .subscribe({
        next: (respuesta) => this.mensajeApi = respuesta,
        error: (err) => {
          console.error('Error al llamar a la API', err);
          this.mensajeApi = 'Error de autorización o conexión. Revisa la consola.';
        }
      });
  }
}