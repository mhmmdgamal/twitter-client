import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twitter-client';
  rates: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         rates(currency: "USD") {
    //           currency
    //           rate
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     console.log(result);
    //   });
  }
}
