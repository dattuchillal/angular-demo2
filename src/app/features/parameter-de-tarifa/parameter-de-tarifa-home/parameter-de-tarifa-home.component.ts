import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BREADCRUMB_PATHS } from '../../../core/constants/breadcrumb-paths.const';
import { ParameterDeTarifaService, ParameterDeTarifas } from '../service/parameter-de-tarifa.service';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { TdDialogService } from '@covalent/core';

interface ParameterDeTarifaSearchData extends ParameterDeTarifas {
  vigenciaDesde: {
    begin: Date;
    end: Date;
  };
}

@Component({
  selector: 'app-parameter-de-tarifa-home',
  templateUrl: './parameter-de-tarifa-home.component.html',
  styleUrls: ['./parameter-de-tarifa-home.component.scss']
})
export class ParameterDeTarifaHomeComponent implements OnInit {
  breadcrumb: any[];
  breadcrumbPaths: any;
  parametroDeTarifaSelectedData: ParameterDeTarifas;
  literals: any = {
    paramTarifas: ''
  };
  dataSource: any[] = [];
  whileLoading = false;
  columns = [];
  constructor(
    private translationService: TranslateService,
    private parameterDeTarifaService: ParameterDeTarifaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertSerive: AlertsService,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.getTranslations();
    this.initialLoad();
  }

  private initialLoad() {
    this.parameterDeTarifaService.findAllParametrosTarifa().subscribe(data => {
      this.dataSource = data.reverse();
      this.whileLoading = true;
    });
  }

  setColumn(literals) {
    this.columns = [
      { name: 'tipodeTarifa', label: literals.paramTarifas.tipoTarifaLabel},
      { name: 'description', label: literals.paramTarifas.descripcionLabel},
      { name: 'fechaDesdeVigencia', label: literals.paramTarifas.vigenciaDesdeLabel},
      { name: 'importeParkingMax', label: literals.paramTarifas.importeMaxLabel},
      { name: 'importeMinSinCompra', label: literals.paramTarifas.importeMinLabel},
      { name: 'tiempoMaxSinCompra', label: literals.paramTarifas.tiempoMaxSCLabel},
      { name: 'importeMin1Hora', label: literals.paramTarifas.importeMin1Label},
      { name: 'importeMin2Hora', label: literals.paramTarifas.importeMin2Label},
      { name: 'fraccionFacturacion', label: literals.paramTarifas.fraccionFactLabel},
      { name: 'costeFraccion', label: literals.paramTarifas.costeFracLabel},
      { name: 'tiempoMaxSalida', label: literals.paramTarifas.tiempoMaxLabel},
      { name: 'numberOfCentros', label: literals.paramTarifas.numCentrosColumn}
    ];
  }

  private getTranslations() {
    const currentLang = this.translationService.currentLang;
    this.translationService.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
      this.setColumn(this.literals);
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        { name: this.breadcrumbPaths.PARAM_TARIFAS.name }
      ];
    });
    this.translationService.onLangChange.subscribe( translations => {
      this.literals = translations.translations;
      this.setColumn(this.literals);
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        { name: this.breadcrumbPaths.TIPOS_TARIFA.name }
      ];
    });
  }

  search(data: ParameterDeTarifaSearchData) {
    this.whileLoading = false;
    const beginDate = data.vigenciaDesde.begin ? moment(new Date(data.vigenciaDesde.begin)).format('YYYY-MM-DD').replace(/-/g, '') : null;
    const endDate = data.vigenciaDesde.end ? moment(new Date(data.vigenciaDesde.end)).format('YYYY-MM-DD').replace(/-/g, '') : null;
    this.parameterDeTarifaService.searchParametrosTarifaData({
      tipodeTarifa: data.tipodeTarifa ? data.tipodeTarifa : null,
      description: data.description ? data.description : null,
      startDate: beginDate,
      endDate: endDate,
      fraccionFacturacion: data.fraccionFacturacion ? data.fraccionFacturacion : null,
      importeParkingMax: data.importeParkingMax ? data.importeParkingMax : null,
      costeFraccion: data.costeFraccion ? data.costeFraccion : null,
      importeMin1Hora: data.importeMin1Hora ? data.importeMin1Hora : null,
      importeMin2Hora: data.importeMin2Hora ? data.importeMin2Hora : null,
      importeMinSinCompra: data.importeMinSinCompra ? data.importeMinSinCompra : null,
      tiempoMaxSalida: data.tiempoMaxSalida ? data.tiempoMaxSalida : null,
      tiempoMaxSinCompra: data.tiempoMaxSinCompra ? data.tiempoMaxSinCompra : null

    }).subscribe(list => {
      this.whileLoading = true;
      if (list.length) {
        this.dataSource = list;
      } else {
        this.dataSource = [];
        this.alertSerive.warning(this.literals.noRecord);
      }
    }, error => {
      this.whileLoading = true;
      this.alertSerive.danger(this.literals.generic_error_title);
    });
  }

  cancel() {
    this.whileLoading = false;
    this.initialLoad();
  }

  delete(parametroDeTarifaData: ParameterDeTarifas) {
    this.parametroDeTarifaSelectedData = parametroDeTarifaData;
    if (parametroDeTarifaData.numberOfCentros >  0 ) {
      // this.openConfirm(parametroDeTarifaData.numberOfCentros);
      this.alertSerive.danger(this.literals.paramNoDelete);
    } else {
      this.deleteParametros();
    }
  }

  edit(data: ParameterDeTarifas) {
    this.parameterDeTarifaService.setParamatroTarifaSelectedData(data);
    this.router.navigate(['parametroAltaNuevo', data.tipodeTarifa, data.id], { relativeTo: this.route });
  }

  checkCenter(data: ParameterDeTarifas) {
    this.parameterDeTarifaService.setParamatroTarifaSelectedData(data);
    this.router.navigate(['centrosAsignedTarifa'], { relativeTo: this.route });
  }

  private deleteParametros() {
      this.whileLoading = false;
      this.parameterDeTarifaService.deleteParametrosTarifaData(this.parametroDeTarifaSelectedData['id']).subscribe(data => {
        this.alertSerive.success(this.literals.successDelete);
        this.whileLoading = true;
        this.dataSource = this.dataSource.filter(dataT => dataT.id !== this.parametroDeTarifaSelectedData['id']);
      }, error => {
        this.whileLoading = true;
        this.alertSerive.danger(this.literals.generic_error_title);
      });
  }

  openConfirm(numero: number): void {
    this._dialogService.openConfirm({
      message: this.literals.numberOfAffectedNumeroCentros + numero,
      disableClose: false,
      title: this.literals.beforeLeaveModal.titulo,
      cancelButton: this.literals.cancel,
      acceptButton: this.literals.confirm,
      width: '500px',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.deleteParametros();
      }
    });
  }

}
