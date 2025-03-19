import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-feed',
  imports: [CommonModule],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.css'
})
export class GlobalFeedComponent {
  public ideas: any[] = [];
  constructor(private http:HttpClient,private apiService:ApiService){}

  ngOnInit(){
    this.apiService.getIdeas("best").subscribe({
      next:(response)=>{
        this.ideas = response;
        console.log(response);
      },
      error:(err)=>{
        "errrrprr";
      }
    })
  }

}
