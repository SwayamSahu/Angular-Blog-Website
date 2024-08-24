import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CardComponent , FormsModule , HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   email : string ="";

constructor(private router: Router ,private http :HttpClient){}
subscribe(){
  // if(this.email){
  //  
  //   return;
  // }
  this.http.post<any>("https://localhost:7202/api/Subscription" , {email :this.email}).subscribe(
    respone =>{
      console.log('subscription sucessful');
      alert('Email sent successfully.');
      
    }, error =>{
      console.error('subscription failed' , error);
    }

  )
}

redirect(){
  this.router.navigate(['/login']);
}

}
