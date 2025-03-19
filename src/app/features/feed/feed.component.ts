import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

  public ideas: any[] = [];

  constructor(private apiService: ApiService,private authService:AuthService){}

  ngOnInit(){
    this.apiService.getIdeas("ideas").subscribe({
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
    const user_id = this.authService.getUserId();
    if(user_id === null){
      return;
    }
    let voteType = type === 'approve' ? "AGREE" : "DISAGREE";

    this.apiService.postVote(user_id,ideaId,voteType).subscribe({
      next:(res)=>{
        const ideaIndex = this.ideas.findIndex(idea => idea.id === ideaId);
        
        if (ideaIndex !== -1) {

          // Update the local counts immediately for real-time feedback
          if (voteType === 'AGREE') {
            if(res === 'vote added'){
              this.ideas[ideaIndex].approvals += 1;
            }
            else{
              this.ideas[ideaIndex].approvals -= 1;
            }
          }
          
          if (voteType === 'DISAGREE') {
            if(res === 'vote added')
              this.ideas[ideaIndex].disapprovals += 1;
            else
              this.ideas[ideaIndex].disapprovals -= 1;
          }

          this.ideas = [...this.ideas];
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
