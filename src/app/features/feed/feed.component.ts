import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  ideaPostBtnTxt:string;
  form : FormGroup;
  public ideas: any[] = [];

  constructor(private apiService: ApiService,private authService:AuthService,private fb:FormBuilder){
    this.ideaPostBtnTxt = "POST";
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.loadIdeas();
  }

  loadIdeas(){
    this.apiService.getIdeas("ideas").subscribe({
      next:(response)=>{
        this.ideas = response;
      },
      error:(err)=>{
        "errrrprr";
      }
    })
  }

  onIdeaSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      const user_id = this.authService.getUserId();
      if(user_id === null){
        return;
      }
      this.apiService.postIdea(user_id,this.form.value.title,this.form.value.description).subscribe({
        next:(response)=>{
          this.loadIdeas();
          this.form.reset();
          this.ideaPostBtnTxt = "Idea Created!";
          setTimeout(() => {
            this.ideaPostBtnTxt = "POST";
          }, 5000);

        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
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
