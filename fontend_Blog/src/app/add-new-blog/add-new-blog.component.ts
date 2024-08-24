import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-add-new-blog',
  standalone: true,
   imports: [CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './add-new-blog.component.html',
  styleUrls: ['./add-new-blog.component.css']
})
export class AddNewBlogComponent {
  addBlogForm: FormGroup;
  blogError: string = '';
 jwtToken:string="";
 
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.addBlogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['art', Validators.required] // Default category
    });
  }
 
  saveBlog() {
    if (this.addBlogForm.invalid) {
      this.blogError = 'Please fill out all fields.';
      return;
    }
 
    const blogData = {
      title: this.addBlogForm.value.title,
      description: this.addBlogForm.value.description,
      categories: this.addBlogForm.value.categories,
      userId:localStorage.getItem('userId')
    };
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
 
    this.http.post<any>('https://localhost:7202/api/Blogs', blogData, httpOptions)
      .subscribe(
        (response) => {
          console.log('Blog post created successfully:', response);
          alert('Blog post created successfully!');
          this.router.navigate(['/main']);
        },
        (error) => {
          this.blogError = 'Error creating blog post. Please try again later.';
          console.error('Error creating blog post:', error);
        }
      );
  }
 
  cancel() {
    console.log('Cancelled adding new blog.');
    this.router.navigateByUrl('/main');
  }
}