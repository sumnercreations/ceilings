// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// breadcrumb
import {Ng2BreadcrumbModule} from 'ng2-breadcrumb/ng2-breadcrumb';

// material.angular.io
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonToggleModule,
  MdRadioModule,
  MdTooltipModule,
  MdSnackBarModule,
  MdDialogModule,
} from '@angular/material';

// routing
import {Routing} from './app.routes';

// classes
import { Feature } from './feature';
import { User } from './_models/user';

// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DesignComponent } from './design/design.component';
import { OptionsComponent } from './options/options.component';
import { LandingComponent } from './landing/landing.component';
import { AlertComponent } from './alert/alert.component';
import { GridDialogComponent } from './grid-dialog/grid-dialog.component';

// services
import { DebugService } from './_services/debug.service';
import { AlertService } from './_services/alert.service';
import { CapitalizePipe } from './_pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DesignComponent,
    OptionsComponent,
    LandingComponent,
    AlertComponent,
    GridDialogComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule,
    MdButtonToggleModule,
    MdRadioModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdDialogModule,
    Ng2BreadcrumbModule.forRoot()
  ],
  providers: [
    Feature,
    User,
    DebugService,
    AlertService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
    OptionsComponent,
    GridDialogComponent
  ],
})
export class AppModule { }
