import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  getIdeas(): Observable<any> {
    return this.http.get(this.apiUrl+"ideas").pipe(
      catchError((error) => {
        console.error("Error fetching ideas:", error);
        return throwError(() => new Error("Failed to fetch ideas"));
      })
    );
  }
  

}
