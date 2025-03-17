import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = "http://localhost:8080/"
  
    constructor(private http:HttpClient,private router:Router) { }
  
    login(credentials:{username:string,password:string}):Observable<any>{
      return this.http.post(this.apiUrl+"login",credentials);
    }

    saveToken(token:string){
      localStorage.setItem('token',token);
    }

    getToken(){
      return localStorage.getItem('token');
    }

    logout(){
      localStorage.removeItem('token');
      this.router.navigate(['\login']);
    }

    getUserId(): number | null {
      const token = this.getToken();
      if (!token) return null;
  
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.user_id || null;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
}
