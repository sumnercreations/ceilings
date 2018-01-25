// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// material.angular.io
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonToggleModule,
  MdRadioModule,
  MdTooltipModule,
  MdSnackBarModule,
  MdDialogModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdTabsModule
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
import { DetailsComponent } from './details/details.component';
import { VeloGridComponent } from './velo-grid/velo-grid.component';
import { VeloTileUsageComponent } from './velo-tile-usage/velo-tile-usage.component';

// services
import { DebugService } from './_services/debug.service';
import { AlertService } from './_services/alert.service';
import { ApiService } from './_services/api.service';
import { MaterialsService } from './_services/materials.service';

// pipes
import { CapitalizePipe } from './_pipes/capitalize.pipe';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { KeysPipe } from './_pipes/keys.pipe';
import { HushOptionsComponent } from './options/hush-options/hush-options.component';
import { VeloOptionsComponent } from './options/velo-options/velo-options.component';
import { ClarioOptionsComponent } from './options/clario-options/clario-options.component';
import { TetriaOptionsComponent } from './options/tetria-options/tetria-options.component';
import { SeeyondOptionsComponent } from './options/seeyond-options/seeyond-options.component';

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
    QuoteDialogComponent,
    DetailsComponent,
    VeloGridComponent,
    VeloTileUsageComponent,
    HushOptionsComponent,
    VeloOptionsComponent,
    ClarioOptionsComponent,
    TetriaOptionsComponent,
    SeeyondOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MdTabsModule
  ],
  providers: [
    Feature,
    User,
    GridSection,
    DebugService,
    AlertService,
    ApiService,
    MaterialsService
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
    VeloTileUsageComponent,
    QuoteDialogComponent
  ]
})
export class AppModule { }
