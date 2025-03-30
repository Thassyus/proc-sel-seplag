import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filtro } from '../models/models.types';

@Injectable({ providedIn: 'root' })
export class FiltroService {
  private _filtro$ = new BehaviorSubject<Filtro>({});

  readonly filtro$ = this._filtro$.asObservable();

  atualizarFiltro(filtro: Filtro) {
    this._filtro$.next(filtro);
  }
}
