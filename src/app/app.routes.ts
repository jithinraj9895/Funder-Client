import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FeedComponent } from './features/feed/feed.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'feed', component: FeedComponent ,canActivate:[authGuard]}
];
