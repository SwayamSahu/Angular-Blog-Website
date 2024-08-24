import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { BlogCardComponent } from '../blog-card/blog-card.component';

import { ArtComponent } from '../categories/art/art.component';
import { LifestyleComponent } from '../categories/lifestyle/lifestyle.component';
import { ScienceComponent } from '../categories/science/science.component';
import { TravelComponent } from '../categories/travel/travel.component';
import { RouterModule } from '@angular/router';
import { AddNewBlogComponent } from '../add-new-blog/add-new-blog.component';
import { AuthService } from '../auth.service';
//import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink,BlogCardComponent,ArtComponent,LifestyleComponent,ScienceComponent,TravelComponent , RouterModule , AddNewBlogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{
  constructor(private router: Router,private authService:AuthService){}

  redirectToNewBlog() {
    this.router.navigateByUrl('/add-new-blog');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  myBlogs(){
    this.router.navigate(['/main/my-blog']);
  }

}

