import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarregandoService } from '../../services/carregando.service';

@Component({
  selector: 'app-carregando-spinner',
  templateUrl: './carregando-spinner.component.html',
  styleUrl: './carregando-spinner.component.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
})
export class CarregandoSpinnerComponent {
  readonly carregandoService = inject(CarregandoService);
}
