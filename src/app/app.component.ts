import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public user: User
  ){}

  ngOnInit() {
    // Check for a logged in user.
    let currentUser = localStorage.getItem('3formUser');
    if(currentUser) {
      // set up the user values
      var parsedUser = JSON.parse(currentUser);
      this.user.uid = parsedUser.uid;
      this.user.email = parsedUser.email;
      this.user.firstname = parsedUser.firstname;
      this.user.lastname = parsedUser.lastname;
    }else{
      // create a new empty user
      this.user = new User;
    }
  }
}
