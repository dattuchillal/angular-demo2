import { NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TiposTarifaRoutingModule } from './tipos-tarifa-routing.module';
import { TiposTarifaComponent } from './tipos-tarifa.component';
import { CoreModule } from 'src/app/shared/core.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TiposTarifaSearchComponent } from './tipos-tarifa-search/tipos-tarifa-search.component';
import { AltaNuevoComponent } from './alta-nuevo/alta-nuevo.component';
import { TiposTarifaHomeComponent } from './tipos-tarifa-home/tipos-tarifa-home.component';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { SnackBarService } from '../../core/services/snackBar/snackService.service';
import { AbandonProcessGuard } from 'src/app/core/services/abandon-process/abandon-process.guard';
import { AbandonProcessService } from 'src/app/core/services/abandon-process/abandon-process.service';
import { CentrosAsignadosComponent } from './centros-asignados/centros-asignados.component';
import { StoreModule } from '@ngrx/store';
import * as fromTipoTarifa from './tipo-tarifa.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TiposTarifaEffects } from './tipos-tarifa.effects';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    TiposTarifaRoutingModule,
    CoreModule,
    TableModule,
    BreadcrumbModule,
    StoreModule.forFeature('tipoTarifa', fromTipoTarifa.tipoTarifaReducer),
    EffectsModule.forRoot([TiposTarifaEffects])
  ],
  declarations: [
    TiposTarifaComponent,
    TiposTarifaSearchComponent,
    AltaNuevoComponent,
    TiposTarifaHomeComponent,
    CentrosAsignadosComponent
  ],
  providers: [
    AlertsService,
    AbandonProcessGuard,
    AbandonProcessService,
    SnackBarService
  ],
  bootstrap: [TiposTarifaComponent]
})
export class TiposTarifaModule { }
