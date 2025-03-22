import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username :string;
  constructor(public authService:AuthService){this.username = authService.getUserName();
    console.log(this.username);
  }

  logout() {
    // Add your logout logic here (clear tokens, navigate, etc.)
    this.authService.logout();
    console.log("Logging out...");
  }

}
