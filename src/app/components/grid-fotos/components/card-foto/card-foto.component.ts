import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Pessoa } from '../../../../models/models.types';

@Component({
  selector: 'app-card-foto',
  templateUrl: './card-foto.component.html',
  styleUrl: './card-foto.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CardFotoComponent {
  @Input() pessoa!: Pessoa;

  dataLocalizacao: string = '';
  dataDesaparecimento: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pessoa'] && this.pessoa) {
      const { dataLocalizacao, dtDesaparecimento } =
        this.pessoa.ultimaOcorrencia;

      if (dataLocalizacao) {
        this.dataLocalizacao = dataLocalizacao.split('-').reverse().join('/');
      }

      if (dtDesaparecimento) {
        this.dataDesaparecimento = dtDesaparecimento
          .split('T')[0]
          .split('-')
          .reverse()
          .join('/');
      }
    }
  }
}
