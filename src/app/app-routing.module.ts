import { CourseComponent } from './course/course.component';
import { FeedComponent } from './feed/feed.component';
import { RegisterComponent } from './register/register.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'home',component: HomeComponent},
  {path: 'profile',component: ViewProfileComponent},
  {path: 'feed',component: FeedComponent},
  {path:'course/:degree_type',component:CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
