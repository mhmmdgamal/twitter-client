import { Component, OnInit, TemplateRef } from '@angular/core';
import { Tweet } from 'src/app/features/tweets/models/tweet';
import { TweetsService } from 'src/app/shared/services/tweets.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = [];
  tweetBody!: string;

  constructor(
    private readonly tweetsService: TweetsService) { }

  ngOnInit(): void {
    this.tweetsService.getAll().subscribe(({ data }: any) => {
      this.tweets = data.tweets;
    });
  }

  addTweet() {
    const currentUser = this.currentUser();
    this.tweetsService.addTweet(this.tweetBody, currentUser?.id)
      .subscribe(({ data }: any) => {
        this.tweetsService.getTweetById(data.createTweet.id)
          .subscribe(({ data }: any) => {
            this.tweets = [data.tweet, ...this.tweets];
            this.tweetBody = '';
          });
      });
  }

  private currentUser() {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }
}
