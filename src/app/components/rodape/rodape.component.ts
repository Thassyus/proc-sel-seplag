import { Component, inject, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ptBRPaginator } from '../../ptBRPaginator';
import { PaginacaoService } from '../../services/paginacao.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.scss',
  standalone: true,
  imports: [MatPaginator],
  providers: [{ provide: MatPaginatorIntl, useValue: ptBRPaginator() }],
})
export class RodapeComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly _paginacaoService = inject(PaginacaoService);
  private readonly _router = inject(Router);

  private readonly _destroy$ = new Subject<void>();

  length = 10;
  pageSize = 10;
  pageIndex = 0;

  showPageSizeOptions = true;
  pageSizeOptions = [10, 20, 40, 100];

  ngOnInit(): void {
    this._paginacaoService.totalRegistros$
      .pipe(takeUntil(this._destroy$))
      .subscribe((total) => {
        this.length = total;
      });
  }

  get naTelaInicial(): boolean {
    return this._router.url === '/grid-fotos';
  }

  ngAfterViewInit(): void {
    if (!this.paginator) return;

    this._paginacaoService.resetPaginator$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        setTimeout(() => {
          if (this.paginator) {
            this.paginator?.firstPage();
          }
        });
      });
  }

  paginacao(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this._paginacaoService.atualizarPaginacao({
      pagina: this.pageIndex,
      porPagina: this.pageSize,
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
