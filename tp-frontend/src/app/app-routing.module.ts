import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ConnectionSearchComponent} from "./components/connection-search/connection-search.component";
import {TripConfigurationComponent} from "./components/trip-configuration/trip-configuration.component";
import {ConfigurationGuard} from "./guards/configuration.guard";
import {FinalizationGuard} from "./guards/finalization.guard";
import {
  ConnectionExpandedComponent
} from "./components/connections/connection/connection-expanded/connection-expanded.component";
import {FinalizationComponent} from "./components/finalization/finalization.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./components/auth/register/register.component";

const routes: Routes = [
  {path: '', redirectTo: 'create', pathMatch: 'full'},
  {path: 'create', component: ConnectionSearchComponent, canActivate: [AuthGuard]},
  {path: 'configure', component: TripConfigurationComponent, canActivate: [ConfigurationGuard]},
  {path: 'connection-detail', component: ConnectionExpandedComponent, canActivate: [ConfigurationGuard]},
  {path: 'finalize', component: FinalizationComponent, canActivate: [FinalizationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
