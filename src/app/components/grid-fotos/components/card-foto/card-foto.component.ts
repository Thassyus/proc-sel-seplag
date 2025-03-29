import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pessoa } from '../../../../models/models.types';

@Component({
  selector: 'app-card-foto',
  templateUrl: './card-foto.component.html',
  styleUrl: './card-foto.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CardFotoComponent {
  @Input() pessoa!: Pessoa;
}
