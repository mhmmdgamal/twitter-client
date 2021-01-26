import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TweetComponent } from './features/tweets/tweet/tweet.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { UserComponent } from './features/users/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthService } from './shared/services/auth.service';
import { TweetsService } from './shared/services/tweets.service';
import { UsersService } from './shared/services/users.service';

import { AuthGuard } from './guards/auth.guard';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    HomeComponent,
    ToolbarComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [AuthService, TweetsService, UsersService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
