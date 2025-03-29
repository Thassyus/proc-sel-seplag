import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbitusService } from '../../abitus.service';
import { Pessoa, RespostaPessoa } from '../../models.types';

@Component({
  selector: 'app-grid-fotos',
  templateUrl: './grid-fotos.component.html',
  styleUrl: './grid-fotos.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class GridFotosComponent {
  private readonly _abitusService = inject(AbitusService);

  listaPessoas: Pessoa[] = [];
  dtDesaparecimento: string = '';

  ngOnInit(): void {
    this.dtDesaparecimento = '';

    this._abitusService.listarPessoas().subscribe({
      next: (respPessoas: RespostaPessoa) => {
        this.listaPessoas = respPessoas.content;
      },
    });
  }
}
