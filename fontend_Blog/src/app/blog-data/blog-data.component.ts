// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-blog-data',
//   standalone: true,
//   imports: [],
//   templateUrl: './blog-data.component.html',
//   styleUrl: './blog-data.component.css'
// })
// export class BlogDataComponent {

// }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelComponent } from '../categories/travel/travel.component';

@Component({
  selector: 'app-blog-data',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,TravelComponent],
  templateUrl: './blog-data.component.html',
  styleUrls: ['./blog-data.component.css']
})
export class BlogDataComponent implements OnInit {
  blog: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.blog = navigation.extras.state['blog'];
    } else {
      // Handle if blog data is not available
      // For example, redirect to home page
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
  }

 
}

