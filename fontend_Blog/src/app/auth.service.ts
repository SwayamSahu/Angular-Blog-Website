import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();
  constructor() { }
  loginvalue() {
    this.isLoggedInSubject.next(true);
  }
   
  logout() {
    this.isLoggedInSubject.next(false);
  }
  setToken(token:string){
    localStorage.setItem('token' , token);
  }
  getToken():string | null{
    return localStorage.getItem('token');

  }
  removeToken(){
    localStorage.removeItem('token');
  }
  
}
