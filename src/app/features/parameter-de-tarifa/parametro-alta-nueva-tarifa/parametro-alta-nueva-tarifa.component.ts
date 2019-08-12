import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { BREADCRUMB_PATHS } from '../../../core/constants/breadcrumb-paths.const';
import { ParameterDeTarifaService, ParameterDeTarifas } from '../service/parameter-de-tarifa.service';
import { Router } from '@angular/router';
import { TipoTarifa } from '../../tipos-tarifa/service/tipo-tarifa.service';
import * as moment from 'moment';
import { TdDialogService } from '@covalent/core';


@Component({
  selector: 'app-parametro-alta-nueva-tarifa',
  templateUrl: './parametro-alta-nueva-tarifa.component.html',
  styleUrls: ['./parametro-alta-nueva-tarifa.component.scss']
})
export class ParametroAltaNuevaTarifaComponent implements OnInit {
  breadcrumb: any[];
  breadcrumbPaths: any;
  literals: any = {
    paramTarifas: ''
  };
  constructor(
    private translationService: TranslateService,
    private alertService: AlertsService,
    private parameterDeTarifaService: ParameterDeTarifaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTranslations();
  }

  private getTranslations() {
    const currentLang = this.translationService.currentLang;
    this.translationService.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        this.breadcrumbPaths.PARAM_TARIFAS,
        { name: this.breadcrumbPaths.ALTA_PARAM_TARIFAS.name }
      ];
    });
    this.translationService.onLangChange.subscribe( translations => {
      this.literals = translations.translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.PARAM_TARIFAS,
        { name: this.breadcrumbPaths.ALTA_PARAM_TARIFAS.name }
      ];
    });
  }

  formSubmittion(userData: { formData: ParameterDeTarifas, isParam: boolean, tipoDeTarifaData: TipoTarifa }) {
    if (!userData.isParam) {
      this.parameterDeTarifaService.saveParametroDeTarifaData(userData.formData).toPromise().then(data => {
// tslint:disable-next-line: max-line-length
        this.parameterDeTarifaService.searchParametrosTarifaData({
          tipodeTarifa: data.tipodeTarifa ? data.tipodeTarifa : null,
          description: data.description ? data.description : null,
          startDate: String(data.fechaDesdeVigencia),
          endDate: String(data.fechaDesdeVigencia),
          importeParkingMax: null,
          costeFraccion: data.costeFraccion ? data.costeFraccion : null,
          importeMin1Hora: null,
          importeMin2Hora: null,
          importeMinSinCompra: null,
          tiempoMaxSalida: null,
          tiempoMaxSinCompra: null
        }).toPromise().then(createSearchData => {
          const successMessage = `Tarifa ${userData.tipoDeTarifaData.tipodeTarifa} - ${userData.tipoDeTarifaData.description}
          con fecha ${this.dateFormat(userData.formData.fechaDesdeVigencia)} dada de alta con éxito. El número de centros
          afectados es ${createSearchData[0].numberOfCentros}`;
          this.alertService.success(successMessage);
          this.router.navigate(['/parametros-tarifa']);
        }, error => {
          this.alertService.success(this.literals.successRecord);
          this.router.navigate(['/parametros-tarifa']);
        });


      }, (error: HttpErrorResponse ) => {
        if (error.status === 409 ) {
          this.alertService.danger(this.literals.parametroTarifExists);
        } else {
          this.alertService.danger(this.literals.generic_error_title);
        }
      });
    } else {
      this.parameterDeTarifaService.editParametroDeTarifaData(userData.formData).subscribe(data => {
        this.alertService.success(this.literals.successRecord);
        this.router.navigate(['/parametros-tarifa']);
      }, error => {
        this.alertService.danger(this.literals.generic_error_title);
      });
    }
  }

  dateFormat(value: number): any {
    const val = value.toString();
    const dateFormatString = val.slice(0, 4) + '/' + val.slice(4, 6) + '/' + val.slice(6, 8);
    return moment(new Date(dateFormatString)).format('DD/MM/YYYY');
  }

}
