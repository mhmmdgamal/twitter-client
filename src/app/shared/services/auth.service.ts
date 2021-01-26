import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const REGISTER_USER = gql`
  mutation registerUser($email: String!, $firstName: String!, $lastName: String!, $username:String!, $password: String!) {
    register(input: {email: $email, firstName: $firstName, lastName: $lastName, username: $username, password: $password}) {
      id
      username
      email
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      id
      username
      email
      token
    }
  }
`;

@Injectable()
export class AuthService {

  constructor(private apollo: Apollo) { }

  register(user: {}) {
    return this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: { ...user }
    });
  }

  login(user: {}) {
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: { ...user }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
