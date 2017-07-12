import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// routing
import {routing} from './app.routes';

// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DesignComponent } from './design/design.component';

// services
import { DebugService } from './_services/debug.service';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DesignComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    DebugService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
