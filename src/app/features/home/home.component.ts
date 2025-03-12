import { Component } from '@angular/core';
import { LoginComponent } from '../../core/auth/login/login.component';

@Component({
  selector: 'app-home',
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
