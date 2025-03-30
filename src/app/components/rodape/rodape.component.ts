import { Component, inject, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
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

  length = 10;
  pageSize = 10;
  pageIndex = 0;

  showPageSizeOptions = true;
  pageSizeOptions = [10, 20, 40, 100];

  ngOnInit(): void {
    this._paginacaoService.totalRegistros$.subscribe((total) => {
      this.length = total;
    });
  }

  get naTelaInicial(): boolean {
    return this._router.url === '/grid-fotos';
  }

  ngAfterViewInit(): void {
    if (!this.paginator) return;

    this._paginacaoService.resetPaginator$.subscribe(() => {
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
}
