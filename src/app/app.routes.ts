import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OptionsComponent } from './options/options.component';
import { DesignComponent } from './design/design.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailsComponent } from './details/details.component';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  // { path: ':type/options', component: OptionsComponent },
  { path: ':type/design', component: DesignComponent },
  { path: ':type/design/:id', component: DesignComponent },
  { path: ':type/design/:id/details', component: DetailsComponent },
  { path: 'clario', redirectTo: 'clario/design', pathMatch: 'full'},
  { path: 'tetria', redirectTo: 'tetria/design', pathMatch: 'full' },
  // { path: 'seeyond', redirectTo: 'seeyond/design', pathMatch: 'full' },
  { path: 'hush-blocks', redirectTo: 'hush-blocks/design', pathMatch: 'full' },
  { path: 'velo', redirectTo: 'velo/design', pathMatch: 'full' },
  { path: 'landing', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
