
// import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports : [CommonModule,FormsModule , HttpClientModule,ReactiveFormsModule],
//   standalone:true

// })
// export class LoginComponent{

//   username: string = "";
//   password: string = "";
//   email: string = "";

  
  

//   constructor(private http: HttpClient , private router:Router, private formBuilder: FormBuilder) {}

 

//   onSubmit() {
    
//     this.http.post("https://localhost:7202/api/Login", {
//       username: this.username,
//       password: this.password
//     }, { responseType: 'text' }).subscribe(
//       (response: any) => {
//         this.router.navigate(['/main'])
//         console.log(response); // Log or handle the response as plain text
//       },
//       (error) => {
//         console.error("Error occurred:", error);
//       }
//     );
   
//   }
 

//   onTrigger() {
    
//     const userData = {
//       UserName: this.username,
//       email: this.email,
//       Password: this.password
//     };

//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };

//     this.http.post<any>('https://localhost:7202/api/UserRegistrations', userData, httpOptions).subscribe(
//       (response) => {
//         console.log('User registered successfully:', response);
//         // Optionally, you can redirect the user to another page upon successful registration
//         this.router.navigate(['/login']);
//       },
//       (error) => {
//         console.error('Error registering user:', error);
//         // Handle error, show error message to the user
//       }
//     );
//   }


// }



import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, ɵprovideZonelessChangeDetection } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  signInError: string = '';
  signUpError: string = '';
  username : string ='';
  password :string ='';
  
 

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder , private authService :AuthService) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const repeatPasswordControl = formGroup.get('repeatPassword');
  
    if (passwordControl && repeatPasswordControl) {
      const password = passwordControl.value;
      const repeatPassword = repeatPasswordControl.value;
  
      if (password !== repeatPassword) {
        repeatPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        repeatPasswordControl.setErrors(null);
      }
    }
  }

  // onSubmit() {
  //   if (this.signInForm.invalid) {
  //     this.signInError = 'Please fill out all fields.';
  //     return;
  //   }
  //   this.signInError = '';

  //   const { username, password } = this.signInForm.value;

  //   this.http.post<any>("https://localhost:7202/api/Login", {
  //     username: username,
  //     password: password
  //   },{observe:'response'}).subscribe(
  //     (response) => {
  //       console.log(response);
  //       const token = response.body.token;
  //       console.log(response.body.userId);
  //       localStorage.setItem('userId',response.body.userId);
  //       if (token) {
  //         this.authService.setToken(token);
  //         console.log(token);
  //         this.router.navigate(['/main']);
  //       }
  //     },
  //     (error) => {
  //       this.signInError = 'Invalid username or password.';
  //       console.error("Error occurred:", error);
  //     }
  //   );

    // const user = {
    //   username: this.username,
    //   password: this.password,
    // };
     
    //     this.http.post<any>("https://localhost:7202/api/Login", user).subscribe({
    //       next: (data) => {
    //         console.log("Login successful:",data);
    //         localStorage.setItem('token', data.token);
    //         localStorage.setItem('userId', data.userId);
    //         this.router.navigate(['/main']);
    //       },
    //       error: (error) => {
    //         console.error("Login failed:", error);
    //       }
    //     });
  //}
 

  onSubmit() {
    if (this.signInForm.invalid) {
      this.signInError = 'Please fill out all fields.';
      return;
    }
    this.signInError = '';
  
    const { username, password } = this.signInForm.value;
  
    const user = {
      username: username,
      password: password,
    };
  
    this.http.post<any>("https://localhost:7202/api/Login", user).subscribe({
      next: (data) => {
        console.log("Login successful:", data);
        this.authService.loginvalue();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigate(['/main']);
      },
      error: (error) => {
        this.signInError = 'Invalid username or password.';
        console.error("Login failed:", error);
      }
    });
  }
  

  onTrigger() {
    if (this.signUpForm.invalid) {
      this.signUpError = 'Please fill out all fields.';
      return;
    }
    this.signUpError = '';

    const userData = {
      UserName: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      Password: this.signUpForm.value.password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>('https://localhost:7202/api/UserRegistrations', userData, httpOptions).subscribe(
      (response) => {
        console.log('User registered successfully:', response);

        alert('Registration successful!');
        // Optionally, you can redirect the user to another page upon successful registration
        this.router.navigate(['/login']);
        
      },
      (error) => {
        this.signUpError = 'Error registering user. Please try again later.';
        console.error('Error registering user:', error);
        // Handle error, show error message to the user
      }
    );
  }
}

