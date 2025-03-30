import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paginacao } from '../models/models.types';

@Injectable({
  providedIn: 'root',
})
export class PaginacaoService {
  private _paginacao = new BehaviorSubject<Paginacao>({
    pagina: 0,
    porPagina: 10,
  });
  private _totalRegistros = new BehaviorSubject<number>(0);
  private _resetPaginator = new BehaviorSubject<void>(undefined);

  readonly paginacao$ = this._paginacao.asObservable();
  readonly totalRegistros$ = this._totalRegistros.asObservable();
  readonly resetPaginator$ = this._resetPaginator.asObservable();

  ultimoPageSize = 10;

  atualizarPaginacao(paginacao: Paginacao) {
    this.ultimoPageSize = paginacao.porPagina;
    this._paginacao.next(paginacao);
  }

  atualizarTotalRegistros(total: number) {
    this._totalRegistros.next(total);
  }

  resetarPaginator() {
    this._resetPaginator.next();
  }
}
