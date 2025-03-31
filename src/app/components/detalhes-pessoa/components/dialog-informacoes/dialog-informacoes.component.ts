import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { ArquivoFoto } from '../../../../models/models.types';
import { AbitusService } from '../../../../services/abitus.service';
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
  private readonly _formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly _abitusService = inject(AbitusService);
  private readonly dialogRef = inject(MatDialogRef<DialogInformacoesComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);

  formInfo!: UntypedFormGroup;
  listaFotos: ArquivoFoto[] = [];

  ngOnInit(): void {
    this.criaFormulario();
  }

  criaFormulario() {
    this.formInfo = this._formBuilder.group({
      informacoes: [null],
      descricao: [null],
      data: [null],
      ocoId: [null],
      fotos: [],
    });

    this.formInfo.patchValue(this.data);
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
    if (!this.formInfo.get('informacoes')?.value) {
      this.toastrService.error(
        'Campo Informações precisa ser diferente de vazio.'
      );
      return;
    }

    if (!this.formInfo.get('data')?.value) {
      this.toastrService.error('Campo Data precisa ser diferente de vazio.');
      return;
    }

    if (!this.formInfo.get('descricao')?.value) {
      this.toastrService.error(
        'Campo Descrição precisa ser diferente de vazio.'
      );
      return;
    }

    this._abitusService
      .enviarInformacoes(this.formInfo.getRawValue(), this.listaFotos)
      .subscribe({
        next: () => {
          this.toastrService.success(
            'Informações adicionais enviadas com sucesso.'
          );
        },
        error: (erro) => {
          this.toastrService.error(
            `Erro ao enviar as informações: '${erro.message}'`
          );
        },
        complete: () => {
          this.dialogRef.close();
        },
      });
  }
}
