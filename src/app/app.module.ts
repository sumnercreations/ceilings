import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {Ng2BreadcrumbModule} from 'ng2-breadcrumb/ng2-breadcrumb';

// material.angular.io
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdButtonToggleModule,
  MdRadioModule,
  MdTooltipModule,
  MdSnackBarModule
} from '@angular/material';

// routing
import {routing} from './app.routes';

// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DesignComponent } from './design/design.component';
import { OptionsComponent } from './options/options.component';
import { LandingComponent } from './landing/landing.component';
import { AlertComponent } from './alert/alert.component';

// services
import { DebugService } from './_services/debug.service';
import { AlertService } from './_services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DesignComponent,
    OptionsComponent,
    LandingComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdButtonToggleModule,
    MdRadioModule,
    MdTooltipModule,
    MdSnackBarModule,
    Ng2BreadcrumbModule.forRoot()
  ],
  providers: [
    DebugService,
    AlertService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
  ],
})
export class AppModule { }
