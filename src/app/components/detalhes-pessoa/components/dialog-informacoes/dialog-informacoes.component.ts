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
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ArquivoFoto } from '../../../../models/models.types';
import { AnexarFotosComponent } from '../anexar-fotos/anexar-fotos.component';

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
    AnexarFotosComponent,
    MatTooltipModule,
  ],
  providers: [provideNgxMask()],
})
export class DialogInformacoesComponent {
  private readonly dialogRef = inject(MatDialogRef<DialogInformacoesComponent>);
  private readonly _formBuilder = inject(FormBuilder);

  formInfo!: UntypedFormGroup;
  listaFotos: ArquivoFoto[] = [];

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

  adicionarFotos(arquivos: File[]) {
    arquivos.forEach((arquivo) => {
      const existeArquivo = this.listaFotos.find(
        (foto) => foto.file.name === arquivo.name
      );

      if (!existeArquivo) {
        const fotoNova: ArquivoFoto = {
          file: arquivo,
          url: URL.createObjectURL(arquivo),
        };

        this.listaFotos.push(fotoNova);
      }
    });
  }

  visualizarFoto(index: number) {
    const url = this.listaFotos[index].url;
    window.open(url, '_blank');
  }

  removerFoto(index: number) {
    URL.revokeObjectURL(this.listaFotos[index].url);
    this.listaFotos.splice(index, 1);
  }

  enviar() {
    //
  }
}
