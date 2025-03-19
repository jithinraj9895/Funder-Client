import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FeedComponent } from './features/feed/feed.component';
import { GlobalFeedComponent } from './features/global-feed/global-feed.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,GlobalFeedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Funder';
}
