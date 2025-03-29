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

  readonly paginacao$ = this._paginacao.asObservable();
  readonly totalRegistros$ = this._totalRegistros.asObservable();

  atualizaPaginacao(paginacao: Paginacao) {
    this._paginacao.next(paginacao);
  }

  atualizaTotalRegistros(total: number) {
    this._totalRegistros.next(total);
  }
}
