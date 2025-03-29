import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { Pessoa, RespostaPessoa } from '../../models/models.types';
import { AbitusService } from '../../services/abitus.service';
import { PaginacaoService } from '../../services/paginacao.service';
import { CardFotoComponent } from './components/card-foto/card-foto.component';

@Component({
  selector: 'app-grid-fotos',
  templateUrl: './grid-fotos.component.html',
  styleUrl: './grid-fotos.component.scss',
  standalone: true,
  imports: [CommonModule, CardFotoComponent],
})
export class GridFotosComponent {
  private readonly _abitusService = inject(AbitusService);
  private readonly _paginacaoService = inject(PaginacaoService);

  listaPessoas: Pessoa[] = [];
  dtDesaparecimento: string = '';

  ngOnInit(): void {
    this.dtDesaparecimento = '';

    this._paginacaoService.paginacao$
      .pipe(
        switchMap(({ pagina, porPagina }) =>
          this._abitusService.listarPessoas(pagina, porPagina)
        )
      )
      .subscribe({
        next: (respPessoas: RespostaPessoa) => {
          this.listaPessoas = respPessoas.content;
          this._paginacaoService.atualizaTotalRegistros(
            respPessoas.totalElements
          );
        },
      });
  }
}
