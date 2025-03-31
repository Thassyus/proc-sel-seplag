import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'anexar-fotos',
  templateUrl: './anexar-fotos.component.html',
  styleUrl: './anexar-fotos.component.scss',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
})
export class AnexarFotosComponent {
  @Input() arquivosAceitos = 'image/*';
  @Output() fotosNovas = new EventEmitter<File[]>();

  selecionandoArquivos(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const arquivos = Array.from(input.files);
      this.fotosNovas.emit(arquivos);
      input.value = '';
    }
  }
}
