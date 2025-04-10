import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Vote } from '../../models/vote';
import { Idea } from '../../models/idea';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "http://localhost:5264/";

  constructor(private http:HttpClient) { }

  getIdeas(endpoint:string): Observable<any> {
    return this.http.get(this.apiUrl+endpoint).pipe(
      catchError((error) => {
        console.error("Error fetching ideas:", error);
        return throwError(() => new Error("Failed to fetch ideas"));
      })
    );
  }

  postIdea(userId: number,title:string,description:string): Observable<string> {
    const ideaDto: Idea = {
      title :title,
      description :description
    };
    
    return this.http.post(`${this.apiUrl}idea/${userId}`, ideaDto, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error("Error posting vote:", error);
        return throwError(() => new Error("Failed to post vote"));
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
