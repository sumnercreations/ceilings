import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(
    private alert: AlertService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.alert.getMessage().subscribe(message => {
      let config = new MdSnackBarConfig();
      config.extraClasses = message.type === 'error' ? ['ceilings-alert-error'] : ['ceilings-alert-success'];
      config.duration = message.type === 'success' ? 1000 : null;
      config.announcementMessage = message.text;
      this.snackBar.open(message.text, 'dismiss', config);
    });
  }

}
