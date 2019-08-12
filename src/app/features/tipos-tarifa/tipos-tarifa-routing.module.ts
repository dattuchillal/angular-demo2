import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposTarifaComponent } from './tipos-tarifa.component';
import { AltaNuevoComponent } from './alta-nuevo/alta-nuevo.component';
import { TiposTarifaHomeComponent } from './tipos-tarifa-home/tipos-tarifa-home.component';
import { AbandonProcessGuard } from 'src/app/core/services/abandon-process/abandon-process.guard';
import { PATHS } from 'src/app/core/constants/paths.const';
import { CentrosAsignadosComponent } from './centros-asignados/centros-asignados.component';

const routes: Routes = [
  { path: '', component: TiposTarifaComponent, children: [
    { path: 'alta', component: AltaNuevoComponent, canDeactivate: [AbandonProcessGuard] },
    { path: 'alta/:id', component: AltaNuevoComponent, canDeactivate: [AbandonProcessGuard] },
    { path: PATHS.centrosAsignadosTipoTarifa, component: CentrosAsignadosComponent },
    { path: '', component: TiposTarifaHomeComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TiposTarifaRoutingModule { }
