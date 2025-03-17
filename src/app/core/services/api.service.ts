import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Vote } from '../../models/vote';

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

  postVote(userId: number, ideaId: number, voteType: string): Observable<string> {
    const vote: Vote = {
      voteType: voteType,
      userId: userId,
      ideaId: ideaId
    };
    
    return this.http.post(`${this.apiUrl}vote/${userId}/${ideaId}`, vote, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error("Error posting vote:", error);
        return throwError(() => new Error("Failed to post vote"));
      })
    );
  }
  

}
