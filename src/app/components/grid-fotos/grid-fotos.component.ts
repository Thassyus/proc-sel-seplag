import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { combineLatest, finalize, Subject, switchMap, takeUntil } from 'rxjs';
import { Pessoa, RespostaPessoa } from '../../models/models.types';
import { AbitusService } from '../../services/abitus.service';
import { CarregandoService } from '../../services/carregando.service';
import { FiltroService } from '../../services/filtro.service';
import { PaginacaoService } from '../../services/paginacao.service';
import { CardFotoComponent } from './components/card-foto/card-foto.component';
import { FiltroComponent } from './components/filtro/filtro.component';

@Component({
  selector: 'app-grid-fotos',
  templateUrl: './grid-fotos.component.html',
  styleUrl: './grid-fotos.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, CardFotoComponent, FiltroComponent],
})
export class GridFotosComponent {
  private readonly _abitusService = inject(AbitusService);
  private readonly _paginacaoService = inject(PaginacaoService);
  private readonly _filtroService = inject(FiltroService);
  private readonly _carregandoService = inject(CarregandoService);

  private readonly _destroy$ = new Subject<void>();

  listaPessoas: Pessoa[] = [];

  ngOnInit(): void {
    combineLatest([
      this._paginacaoService.paginacao$,
      this._filtroService.filtro$,
    ])
      .pipe(
        takeUntil(this._destroy$),
        switchMap(([paginacao, filtro]) => {
          this._carregandoService.mostrarCarregando();

          return this._abitusService
            .listarPessoas(paginacao.pagina, paginacao.porPagina, filtro)
            .pipe(finalize(() => this._carregandoService.esconderCarregando()));
        })
      )
      .subscribe({
        next: (respPessoas: RespostaPessoa) => {
          this.listaPessoas = respPessoas.content;
          this._paginacaoService.atualizarTotalRegistros(
            respPessoas.totalElements
          );
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
