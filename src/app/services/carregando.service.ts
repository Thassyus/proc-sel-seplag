import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarregandoService {
  private _carregando = new BehaviorSubject<boolean>(false);
  readonly carregando$ = this._carregando.asObservable();

  mostrarCarregando() {
    this._carregando.next(true);
  }

  esconderCarregando() {
    this._carregando.next(false);
  }
}
