import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pessoa } from '../../models/models.types';
import { AbitusService } from '../../services/abitus.service';

@Component({
  selector: 'app-detalhes-pessoa',
  templateUrl: './detalhes-pessoa.component.html',
  styleUrl: './detalhes-pessoa.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatTooltip, RouterModule, CommonModule],
})
export class DetalhesPessoaComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _abitusService = inject(AbitusService);

  idPessoa!: string;
  dadosPessoa!: Pessoa;
  situacaoPessoa!: string;

  dtLocalizacao!: any;
  dtDesaparecimento!: any;
  qtdeDiasDesap!: number;
  urlFoto!: string;

  ngOnInit(): void {
    this.idPessoa = this._route.snapshot.url[1].path;

    this._abitusService.buscarPessoas(this.idPessoa).subscribe({
      next: (respPessoa: Pessoa) => {
        this.dadosPessoa = respPessoa;
      },
      complete: () => {
        this.carregaDadosPessoa();
      },
    });
  }

  carregaDadosPessoa() {
    if (!this.dadosPessoa?.urlFoto || this.dadosPessoa?.urlFoto === null) {
      this.dadosPessoa.urlFoto = 'assets/pessoa-sem-foto.png';
    }

    if (this.dadosPessoa.sexo === 'MASCULINO') {
      if (this.dadosPessoa.ultimaOcorrencia.dataLocalizacao) {
        this.situacaoPessoa = 'Localizado';
      } else {
        this.situacaoPessoa = 'Desaparecido';
      }
    } else {
      if (this.dadosPessoa.ultimaOcorrencia.dataLocalizacao) {
        this.situacaoPessoa = 'Localizada';
      } else {
        this.situacaoPessoa = 'Desaparecida';
      }
    }

    const ocorrencia = this.dadosPessoa?.ultimaOcorrencia;

    if (ocorrencia) {
      const desaparecimentoData = ocorrencia.dtDesaparecimento;
      const localizacaoData = ocorrencia.dataLocalizacao;

      this.dtDesaparecimento = desaparecimentoData;
      this.dtLocalizacao = localizacaoData;

      const hoje = new Date();
      const dataDesap = new Date(desaparecimentoData);

      const diffEmMs = Math.abs(hoje.getTime() - dataDesap.getTime());
      this.qtdeDiasDesap = Math.floor(diffEmMs / (1000 * 60 * 60 * 24));

      const [dataStr, horaStr] = desaparecimentoData.split('T');

      const dataFormatada = dataStr.split('-').reverse().join('/');
      this.dtDesaparecimento = `${dataFormatada} - ${horaStr}`;

      if (localizacaoData) {
        this.dtLocalizacao = localizacaoData.split('-').reverse().join('/');
      }
    }
  }
}
