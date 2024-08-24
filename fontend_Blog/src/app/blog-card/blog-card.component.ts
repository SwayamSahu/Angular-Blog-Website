import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  @Input()
  imageUrl!: string;
  @Input() text!: string  

  
  
}
