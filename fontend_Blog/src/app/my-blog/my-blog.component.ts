export interface Blogs{
  blogId:number,
  description:string,
  title:string,
  categories :string
  imageUrl: string; 
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blog',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './my-blog.component.html',
  styleUrl: './my-blog.component.css'
})
export class MyBlogComponent {
  blogs :Blogs[] =[];
  constructor(private http : HttpClient , private router :Router){}
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if(!userId){
      console.error('User Id Not found');
      return;
    }
   
    this.http.get<Blogs[]>(`https://localhost:7202/api/Blogs/ByUser/${userId}`).subscribe(
          blogs => {
            blogs.forEach(blog => {
              // Manually adding the imageUrl property
              blog.imageUrl = 'https://source.unsplash.com/featured/?art&w=100&h=100';
            });
            this.blogs = blogs;
          },
          error => {
            console.error('Error fetching collections:', error);
          }
        );

  }

  redirectToBlogData(blog: Blogs) {
    // Assuming you have defined 'blog-data' route in your router configuration
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
