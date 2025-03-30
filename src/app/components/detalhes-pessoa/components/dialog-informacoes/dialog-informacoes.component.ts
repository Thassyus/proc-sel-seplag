import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-dialog-informacoes',
  templateUrl: './dialog-informacoes.component.html',
  styleUrl: './dialog-informacoes.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class DialogInformacoesComponent {
  private readonly dialogRef = inject(MatDialogRef<DialogInformacoesComponent>);
  private readonly _formBuilder = inject(FormBuilder);

  formInfo!: UntypedFormGroup;

  ngOnInit(): void {
    this.criaFormulario();
  }

  criaFormulario() {
    this.formInfo = this._formBuilder.group({
      informacao: [null],
      descricao: [null],
      data: [null],
      ocoId: [null],
      fotos: [],
    });
  }

  enviar() {
    //
  }
}
