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
  MdInputModule,
  MdProgressSpinnerModule
} from '@angular/material';

// routing
import {Routing} from './app.routes';

// classes
import { Feature } from './feature';
import { User } from './_models/user';
import { GridSection } from './_models/grid-section';

// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DesignComponent } from './design/design.component';
import { OptionsComponent } from './options/options.component';
import { LandingComponent } from './landing/landing.component';
import { AlertComponent } from './alert/alert.component';
import { GridComponent } from './grid/grid.component';
import { LoadDesignComponent } from './load-design/load-design.component';
import { SaveDesignComponent } from './save-design/save-design.component';
import { LoginComponent } from './login/login.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { TileUsageComponent } from './tile-usage/tile-usage.component';
import { QuoteDialogComponent } from './quote-dialog/quote-dialog.component';

// services
import { DebugService } from './_services/debug.service';
import { AlertService } from './_services/alert.service';
import { ApiService } from './_services/api.service';

// pipes
import { CapitalizePipe } from './_pipes/capitalize.pipe';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { KeysPipe } from './_pipes/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DesignComponent,
    OptionsComponent,
    LandingComponent,
    AlertComponent,
    CapitalizePipe,
    GridComponent,
    LoadDesignComponent,
    SaveDesignComponent,
    LoginComponent,
    ConfirmDeleteComponent,
    VisualizationComponent,
    TileUsageComponent,
    KeysPipe,
    QuoteDialogComponent
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
    MdInputModule,
    MdProgressSpinnerModule,
    Ng2BreadcrumbModule.forRoot()
  ],
  providers: [
    Feature,
    User,
    GridSection,
    DebugService,
    AlertService,
    ApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
    OptionsComponent,
    LoadDesignComponent,
    SaveDesignComponent,
    LoginComponent,
    ConfirmDeleteComponent,
    VisualizationComponent,
    TileUsageComponent,
    QuoteDialogComponent
  ]
})
export class AppModule { }
