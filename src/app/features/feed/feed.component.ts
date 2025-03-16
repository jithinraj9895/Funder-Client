import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

  public ideas: any[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService.getIdeas().subscribe({
      next:(response)=>{
        this.ideas = response;
      },
      error:(err)=>{
        "errrrprr";
      }
    })
  }


  vote(ideaId: number, type: 'approve' | 'disapprove') {
    console.log("voting");
  }
}
