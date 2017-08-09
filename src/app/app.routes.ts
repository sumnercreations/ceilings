import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OptionsComponent } from './options/options.component';
import { DesignComponent } from './design/design.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  // { path: ':type/options', component: OptionsComponent },
  { path: ':type/design', component: DesignComponent },
  { path: ':type/design/:id', component: DesignComponent },
  { path: 'baffles', redirectTo: 'baffles/design', pathMatch: 'full'},
  { path: 'tiles', redirectTo: 'tiles/design', pathMatch: 'full' },
  { path: 'clouds', redirectTo: 'clouds/design', pathMatch: 'full' },
  { path: 'landing', redirectTo: '', pathMatch: 'full'},
	{ path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
