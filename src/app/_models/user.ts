import { Injectable } from '@angular/core';

@Injectable()
export class User {
  private static _instance: User = new User();
  uid: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;

  constructor() {
    if (User._instance) {
      return User._instance;
    }

    User._instance = this;
  }

  public getFullname() {
    return this.firstname + ' ' + this.lastname;
  }
}
