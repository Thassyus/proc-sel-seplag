import { Component, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginacaoService } from '../../services/paginacao.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.scss',
  standalone: true,
  imports: [MatPaginator],
})
export class RodapeComponent {
  private readonly _paginacaoService = inject(PaginacaoService);

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

  paginacao(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this._paginacaoService.atualizaPaginacao({
      pagina: this.pageIndex,
      porPagina: this.pageSize,
    });
  }
}
