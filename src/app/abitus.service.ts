import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespostaPessoa } from './models.types';

@Injectable({
  providedIn: 'root',
})
export class AbitusService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://abitus-api.geia.vip/v1/pessoas/aberto';

  listarPessoas(): Observable<RespostaPessoa> {
    return this._http.get<RespostaPessoa>(`${this._url}/filtro`);
  }
}
