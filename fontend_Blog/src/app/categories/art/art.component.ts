// import { CommonModule} from '@angular/common';
// import { Component, Input, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-art',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './art.component.html',
//   styleUrl: './art.component.css'
// })
// export class ArtComponent {
//   @Input() imageUrl!: string;
//   @Input() text!: string;
//   @Output() textClicked: EventEmitter<string> = new EventEmitter<string>();

//   redirectToBlogPage() {
//     // Emit the text value to the parent component
//     this.textClicked.emit(this.text);
//   }

// }


import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-art',
  standalone: true,
  imports: [HttpClientModule , FormsModule , CommonModule],
  templateUrl: './art.component.html',
  styleUrl: './art.component.css'
})
export class ArtComponent implements OnInit{
  blogs: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Fetch blogs by category
    this.http.get<any[]>('https://localhost:7202/api/Blogs/Category/art')
      .subscribe(blogs => {
        blogs.forEach(blog => {
          blog.imageUrl = 'https://source.unsplash.com/featured/?art&w=100&h=100';
        });
        this.blogs = blogs;
      });
  }

  redirectToBlogData(blog: any) {
    this.router.navigateByUrl('/blog-data', { state: { blog: blog } });
  }


  getShortDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...'; // Display only the first 20 words
    }
    return description;
  }
}
