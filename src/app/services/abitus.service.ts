import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filtro, RespostaPessoa } from '../models/models.types';

@Injectable({
  providedIn: 'root',
})
export class AbitusService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://abitus-api.geia.vip/v1/pessoas/aberto';

  listarPessoas(
    pagina = 0,
    porPagina = 10,
    filtro?: Filtro
  ): Observable<RespostaPessoa> {
    let params = new HttpParams()
      .set('pagina', pagina)
      .set('porPagina', porPagina);

    if (filtro) {
      if (filtro.nome) params = params.set('nome', filtro.nome);

      if (filtro.faixaIdadeInicial)
        params = params.set('faixaIdadeInicial', filtro.faixaIdadeInicial);

      if (filtro.faixaIdadeInicial)
        params = params.set('faixaIdadeInicial', filtro.faixaIdadeInicial);

      if (filtro.faixaIdadeFinal)
        params = params.set('faixaIdadeInicial', filtro.faixaIdadeFinal);

      if (filtro.sexo) params = params.set('sexo', filtro.sexo.value);

      if (filtro.status) params = params.set('status', filtro.status.value);
    }

    return this._http.get<RespostaPessoa>(`${this._url}/filtro`, { params });
  }
}
