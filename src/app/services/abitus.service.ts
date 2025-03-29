import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespostaPessoa } from '../models/models.types';

@Injectable({
  providedIn: 'root',
})
export class AbitusService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://abitus-api.geia.vip/v1/pessoas/aberto';

  listarPessoas(pagina = 0, porPagina = 10): Observable<RespostaPessoa> {
    const params = new HttpParams()
      .set('pagina', pagina)
      .set('porPagina', porPagina);

    return this._http.get<RespostaPessoa>(`${this._url}/filtro`, { params });
  }
}
