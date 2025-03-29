import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbitusService } from '../../abitus.service';
import { RespostaPessoa } from '../../models.types';

@Component({
  selector: 'app-grid-fotos',
  templateUrl: './grid-fotos.component.html',
  styleUrl: './grid-fotos.component.scss',
  standalone: true,
  imports: [JsonPipe],
})
export class GridFotosComponent {
  private readonly _abitusService = inject(AbitusService);

  listaPessoas: any = [];

  ngOnInit(): void {
    this._abitusService.listarPessoas().subscribe({
      next: (listaPessoas: RespostaPessoa) => {
        this.listaPessoas = listaPessoas;
      },
    });
  }
}
