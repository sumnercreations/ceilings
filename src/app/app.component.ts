import { Feature } from 'app/_features/feature';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { environment } from '../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened: boolean;
  showMainNavbar = true;

  constructor(public user: User, public feature: Feature, public route: ActivatedRoute) {
    window['environment'] = () => {
      return environment;
    };
  }

  ngOnInit() {
    this.checkForUser();
    this.setTemplateValues();

    this.feature.onToggleSideNav.subscribe(event => {
      this.opened = !this.opened;
    });
  }

  checkForUser() {
    // Check for a logged in user.
    const currentUser = localStorage.getItem('3formUser');
    if (currentUser) {
      // set up the user values
      const parsedUser = JSON.parse(currentUser);
      this.user.uid = parsedUser.uid;
      this.user.email = parsedUser.email;
      this.user.firstname = parsedUser.firstname;
      this.user.lastname = parsedUser.lastname;
    } else {
      // create a new empty user
      this.user = new User();
    }
  }

  setTemplateValues() {
    if (window.location.href.includes('details')) {
      this.showMainNavbar = false;
    }
  }
}
