import { Component } from '@angular/core';
import { LoginComponent } from '../../core/auth/login/login.component';
import { GlobalFeedComponent } from '../global-feed/global-feed.component';

@Component({
  selector: 'app-home',
  imports: [GlobalFeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
