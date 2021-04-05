import { DataserviceService } from './_services/dataservice.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DataTablesModule} from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FeedComponent } from './feed/feed.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    ViewProfileComponent,
    HomeComponent,
    FooterComponent,
    FeedComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [
    AuthService,
    DataserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
