import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParameterDeTarifaComponent } from './parameter-de-tarifa.component';
import { ParameterDeTarifaHomeComponent } from './parameter-de-tarifa-home/parameter-de-tarifa-home.component';
import { ParametroAltaNuevaTarifaComponent } from './parametro-alta-nueva-tarifa/parametro-alta-nueva-tarifa.component';
import { CentrosAsignadoaComponent } from './centros-asignadoa/centros-asignadoa.component';

const routes: Routes = [
  { path: '', component: ParameterDeTarifaComponent, children: [
    { path: '', component: ParameterDeTarifaHomeComponent },
    { path: 'parametroAltaNuevo', component: ParametroAltaNuevaTarifaComponent },
    { path: 'parametroAltaNuevo/:parametroDeTarifa/:parametroDeTarifaId', component: ParametroAltaNuevaTarifaComponent },
    { path: 'centrosAsignedTarifa', component: CentrosAsignadoaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterDeTarifaRoutingModule { }
