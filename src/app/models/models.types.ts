export interface RespostaPessoa {
  totalPages: number;
  totalElements: number;
  pageable: Paginavel;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Pessoa[];
  number: number;
  sort: Ordenacao;
  empty: boolean;
}

export interface Paginavel {
  pageNumber: number;
  pageSize: number;
  sort: Ordenacao;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Ordenacao {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: true;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string;
  encontradoVivo: false;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: ocorrenciaEntrevDesapDTO;
  listaCartaz: string;
  ocoId: number;
}

export interface ocorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface Paginacao {
  pagina: number;
  porPagina: number;
}
