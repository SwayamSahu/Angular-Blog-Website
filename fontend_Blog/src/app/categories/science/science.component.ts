import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-science',
  standalone: true,
  imports: [HttpClientModule , FormsModule , CommonModule],
  templateUrl: './science.component.html',
  styleUrl: './science.component.css'
})
export class ScienceComponent {
  blogs: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Fetch blogs by category
    this.http.get<any[]>('https://localhost:7202/api/Blogs/Category/science')
      .subscribe(blogs => {
        blogs.forEach(blog => {
          blog.imageUrl = 'https://source.unsplash.com/featured/?science,technology&w=100&h=100';
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
