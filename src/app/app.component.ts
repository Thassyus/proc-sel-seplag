import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { CarregandoSpinnerComponent } from './components/carregando-spinner/carregando-spinner.component';
import { RodapeComponent } from './components/rodape/rodape.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    CabecalhoComponent,
    RodapeComponent,
    CarregandoSpinnerComponent,
  ],
})
export class AppComponent {}
