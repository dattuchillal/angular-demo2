import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterDeTarifaRoutingModule } from './parameter-de-tarifa-routing.module';
import { ParameterDeTarifaComponent } from './parameter-de-tarifa.component';
import { ParameterDeTarifaHomeComponent } from './parameter-de-tarifa-home/parameter-de-tarifa-home.component';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../shared/core.module';
import { TableModule } from '../../shared/table/table.module';
import { ParameterDeTarifaSearchComponent } from './parameter-de-tarifa-search/parameter-de-tarifa-search.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule, SatNativeDateModule  } from 'saturn-datepicker';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/dateAdapter/date.adapter';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { SnackBarService } from '../../core/services/snackBar/snackService.service';
import { ParametroAltaNuevaTarifaComponent } from './parametro-alta-nueva-tarifa/parametro-alta-nueva-tarifa.component';
import { AltaNuevaTarifaUpdationComponent } from './alta-nueva-tarifa-updation/alta-nueva-tarifa-updation.component';
import { AllowNumericOnlyDirective } from '../../shared/gestionParkingDirectives/allow-numeric-only.directive';
import { CentrosAsignadoaComponent } from './centros-asignadoa/centros-asignadoa.component';
import { NumericWithTwoDecimalDirective } from '../../shared/gestionParkingDirectives/numeric-with-two-decimal.directive';


@NgModule({
  declarations: [
    ParameterDeTarifaComponent,
    ParameterDeTarifaHomeComponent,
    ParameterDeTarifaSearchComponent,
    ParametroAltaNuevaTarifaComponent,
    AltaNuevaTarifaUpdationComponent,
    AllowNumericOnlyDirective,
    CentrosAsignadoaComponent,
    NumericWithTwoDecimalDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    CoreModule,
    SatDatepickerModule,
    SatNativeDateModule,
    TableModule,
    ParameterDeTarifaRoutingModule,
    BreadcrumbModule
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AlertsService,
    SnackBarService
  ]
})
export class ParameterDeTarifaModule { }
