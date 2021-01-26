import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { TweetsService } from 'src/app/shared/services/tweets.service';
import { Tweet } from '../models/tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input()
  tweet!: Tweet;
  modalRef!: BsModalRef;
  commentBody = '';

  constructor(
    private readonly modalService: BsModalService,
    private readonly tweetService: TweetsService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addComment(tweet: Tweet) {
    this.tweetService
      .addComment({ body: this.commentBody, userId: tweet?.user?.id, tweetId: tweet?.id })
      .subscribe(({ data }) => {
        this.commentBody = '';
        this.modalRef.hide();
      });
  }
}
