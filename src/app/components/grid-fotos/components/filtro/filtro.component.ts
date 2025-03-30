import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Sexo, Situacao } from '../../../../models/models.types';
import { FiltroService } from '../../../../services/filtro.service';
import { PaginacaoService } from '../../../../services/paginacao.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class FiltroComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _filtroService = inject(FiltroService);
  private readonly _paginacaoService = inject(PaginacaoService);

  formFiltrar!: UntypedFormGroup;
  filtrando: boolean = false;

  listaSexo: Sexo[] = [
    { value: 'MASCULINO', descricao: 'Masculino' },
    { value: 'FEMININO', descricao: 'Feminino' },
  ];

  listaSituacao: Situacao[] = [
    { value: 'DESAPARECIDO', descricao: 'Desaparecido' },
    { value: 'LOCALIZADO', descricao: 'Localizado' },
  ];

  ngOnInit(): void {
    this.criaFormulario();
  }

  criaFormulario() {
    this.formFiltrar = this._formBuilder.group({
      nome: [null],
      faixaIdadeInicial: [null],
      faixaIdadeFinal: [null],
      sexo: [null],
      status: [null],
    });
  }

  limparFiltro() {
    this.formFiltrar.reset();
    const filtro = {};
    this.filtrando = false;

    this._paginacaoService.resetarPaginator();
    this._paginacaoService.atualizarPaginacao({
      pagina: 0,
      porPagina: this._paginacaoService.ultimoPageSize,
    });

    this._filtroService.atualizarFiltro(filtro);
  }

  aplicaFiltro() {
    this.filtrando = true;

    const filtro = this.formFiltrar.value;

    this._paginacaoService.resetarPaginator();
    this._paginacaoService.atualizarPaginacao({
      pagina: 0,
      porPagina: this._paginacaoService.ultimoPageSize,
    });

    this._filtroService.atualizarFiltro(filtro);
  }
}
