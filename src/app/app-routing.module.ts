import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PATHS } from './core/constants/paths.const';
import { AuthGuard } from './core/security/auth-guard.service';

const routes: Routes = [
  { path: PATHS.login, loadChildren: './features/login/login.module#LoginModule' },
  { path: PATHS.home, loadChildren: './features/home/home.module#HomeModule' },
  { path: PATHS.tiposTarifa, loadChildren: './features/tipos-tarifa/tipos-tarifa.module#TiposTarifaModule', canActivate: [AuthGuard] },
  { path: PATHS.paramsTarifa, loadChildren: './features/parameter-de-tarifa/parameter-de-tarifa.module#ParameterDeTarifaModule' },
  { path: '**', redirectTo: PATHS.tiposTarifa, pathMatch: 'full', canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
