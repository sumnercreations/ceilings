import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Feature } from '../feature';
import { User } from '../_models/user';
import { AlertService } from '../_services/alert.service';
import { ApiService } from '../_services/api.service';
import { DebugService } from './../_services/debug.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public loading = false;

  constructor(
    private alert: AlertService,
    private api: ApiService,
    private debug: DebugService,
    public feature: Feature,
    public user: User,
    public dialogRef: MdDialogRef<LoginComponent>
  ) { }

  ngOnInit() {
    this.debug.log('login-component', this.user);
  }

  login() {
    this.loading = true;
    this.api.login(this.email, this.password)
      .subscribe( res => {
        this.loading = false;
        this.dialogRef.close();
      });
  }
}
