import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const USER = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      firstName
      lastName
      username
      followersCount
      followingsCount
    }
  }`;


const FOLLOW = gql`
  mutation follow($userId: ID!, $followerId: String!) {
    followUser(input: { userId: $userId, followerId: $followerId }) {
      id
    }
  }`;

const UNFOLLOW = gql`
  mutation unfollow($userId: ID!, $followerId: String!) {
    unFollowUser(input: { userId: $userId, followerId: $followerId })
  }`;

const IS_FOLLOWING = gql`
  query isFollowing($userId: ID!, $followerId: String!) {
    isFollowing(input: { userId: $userId, followerId: $followerId })
  }`;

@Injectable()
export class UsersService {

  constructor(private readonly apollo: Apollo) { }

  getByUsername(username: string) {
    return this.apollo.watchQuery({
      query: USER,
      variables: { username }
    }).valueChanges;
  }

  follow(userId: string, followerId: string) {
    return this.apollo.mutate({
      mutation: FOLLOW,
      variables: { userId, followerId }
    });
  }

  unfollow(userId: string, followerId: string) {
    return this.apollo.mutate({
      mutation: UNFOLLOW,
      variables: { userId, followerId }
    });
  }

  isFollowing(userId: string, followerId: string) {
    return this.apollo.query({
      query: IS_FOLLOWING,
      variables: { userId, followerId }
    });
  }
}

