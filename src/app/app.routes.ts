import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FeedComponent } from './features/feed/feed.component';
import { authGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'feed', component: FeedComponent ,canActivate:[authGuard]}
];
