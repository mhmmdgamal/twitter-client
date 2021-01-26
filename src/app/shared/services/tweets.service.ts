import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const ALL_TWEETS = gql`
  query tweets {
    tweets {
      id
      body
      user {
        id
        username
        firstName
        lastName
      }
    }
  }`;

const TWEET_BY_ID = gql`
  query tweet($id: ID!) {
    tweet(id: $id) {
      id
      body
      user {
        id
        username
        firstName
        lastName
      }
    }
  }`;

const ADD_COMMENT = gql`
  mutation addComment($body: String!, $tweetId: ID!, $userId: ID!) {
    addComment(input: { body: $body, userId: $userId, tweetId: $tweetId }) {
      id
      body
    }
  }`;

const ADD_TWEET = gql`
  mutation addTweet($body: String!, $userId: ID!) {
    createTweet(input: { body: $body, userId: $userId }) {
      id
      body
    }
  }`;

@Injectable()
export class TweetsService {

  constructor(private readonly apollo: Apollo) { }

  getAll() {
    return this.apollo.watchQuery({
      query: ALL_TWEETS
    }).valueChanges;
  }

  addComment(comment: {}) {
    return this.apollo.mutate({
      mutation: ADD_COMMENT,
      variables: { ...comment }
    });
  }

  addTweet(body: string, userId: string) {
    return this.apollo.mutate({
      mutation: ADD_TWEET,
      variables: { body, userId }
    });
  }

  getTweetById(id: string) {
    return this.apollo.watchQuery({
      query: TWEET_BY_ID,
      variables: { id }
    }).valueChanges;
  }
}
