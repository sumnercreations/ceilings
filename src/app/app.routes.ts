import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptionsComponent } from './options/options.component';
// import { DesignComponent } from './design/design.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/design/options', pathMatch: 'full'},
  { path: 'design', redirectTo: '/design/options', pathMatch: 'full'},
  { path: 'design/options', component: OptionsComponent },
	{ path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
