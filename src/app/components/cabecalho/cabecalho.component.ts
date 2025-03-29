import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
  standalone: true,
  imports: [],
})
export class CabecalhoComponent {
  dataAtual: string = '';

  ngOnInit(): void {
    this.dataAtual = new Date(Date.now()).toLocaleDateString('pt-BR', {
      timeZone: 'America/Cuiaba',
    });
  }
}
