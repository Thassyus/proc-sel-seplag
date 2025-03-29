import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Sexo, Situacao } from '../../../../models/models.types';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
})
export class FiltroComponent {
  private readonly _formBuilder = inject(FormBuilder);

  formBuscar!: UntypedFormGroup;

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
    this.formBuscar = this._formBuilder.group({
      nome: [null],
      faixaIdadeInicial: [null],
      faixaIdadeFinal: [null],
      sexo: [null],
      status: [null],
    });
  }
}
