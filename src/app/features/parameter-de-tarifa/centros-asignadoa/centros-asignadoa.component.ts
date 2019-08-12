import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BREADCRUMB_PATHS } from 'src/app/core/constants/breadcrumb-paths.const';
import { ParameterDeTarifaService } from '../service/parameter-de-tarifa.service';
import { Subscription, Observable } from 'rxjs';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoTarifaEto, TipoTarifa, TipoTarifaService } from '../../tipos-tarifa/service/tipo-tarifa.service';
import * as moment from 'moment';

@Component({
  selector: 'app-centros-asignadoa',
  templateUrl: './centros-asignadoa.component.html',
  styleUrls: ['./centros-asignadoa.component.scss']
})
export class CentrosAsignadoaComponent implements OnInit, OnDestroy {

  @Output() searchData = new EventEmitter<TipoTarifaEto>();
  dataSource: any[] = [];
  subscription: Subscription;
  whileLoading = false;
  view = true;
  showView = false;
  columns = [];
  literals: any = {};
  breadcrumb: any[];
  breadcrumbPaths: any;
  postData: any = {};
  tipoDeTarifaControl;
  tipoDeDescriptionControl;
  tipoTarifaData: TipoTarifa;
  parkingRateManagement: FormGroup;
  constantData: any;
  constructor(
    private formBuilder: FormBuilder,
    private readonly translationService: TranslateService,
    private parameterDeTarifaService: ParameterDeTarifaService,
    private alertSerive: AlertsService,
    private tipoTarifaService: TipoTarifaService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.parkingRateManagement = formBuilder.group({
        centro: '',
        description: ''
      });
      this.tipoDeTarifaControl = this.parkingRateManagement.get('centro');
      this.tipoDeDescriptionControl = this.parkingRateManagement.get('description');
     }

  ngOnInit() {
    this.constantData = this.parameterDeTarifaService.getParamatroTarifaSelectedData();
    this.getTranslations();
    this.initialLoad(this.constantData);
    console.log('constantData', this.constantData);
  }

  setColumn(literals) {
    this.columns = [
      { name: 'centro', label: literals.tarifasCentro.codigoCentro},
      { name: 'description', label: literals.tarifasCentro.descripcion},
      { name: 'fechaDesdeVigencia', label: literals.paramTarifas.fechaDesdeLabel},
      { name: 'fechaFin', label: literals.paramTarifas.fechaFinLabel}
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
        this.breadcrumbPaths.PARAM_TARIFAS,
        { name: this.literals.paramTarifas.detalleCentrosTitle }
      ];
    });
    this.translationService.onLangChange.subscribe( translations => {
      this.literals = translations.translations;
      this.setColumn(this.literals);
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        this.breadcrumbPaths.PARAM_TARIFAS,
        { name: this.literals.paramTarifas.detalleCentrosTitle }
      ];
    });
  }

  private initialLoad(constantData) {
    this.postData = {
      'tipodeTarifa': constantData.tipodeTarifa,
      'description': constantData.description,
      'fechaDesdeVigencia': constantData.fechaDesdeVigencia
      // 'centro': constantData.centro
    };

    this.tipoTarifaService.searchTipoCentrosData(this.postData).subscribe(list => {
      this.whileLoading = true;

      if (list.length) {
        this.dataSource = [];
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

  dateFormat(value: number): any {
    const val = value.toString();
    const dateFormatString = val.slice(0, 4) + '/' + val.slice(4, 6) + '/' + val.slice(6, 8);
    return moment(new Date(dateFormatString)).format('DD/MM/YYYY');
  }

  parkingRateManagementSubmit() {
    const data = this.parkingRateManagement.value;
    this.constantData = this.parameterDeTarifaService.getParamatroTarifaSelectedData();
    this.whileLoading = false;
    const searchData = {};
    searchData['tipodeTarifa'] = this.constantData.tipodeTarifa;
    searchData['description'] = this.constantData.description;
    searchData['fechaDesdeVigencia'] = this.constantData.fechaDesdeVigencia;
    if (data.centro !== '') {
      searchData['centro'] = data.centro;
    }
    if (data.description !== '') {
      searchData['mastroDescripcion'] = data.description;
    }

    this.tipoTarifaService.searchTipoCentrosData(searchData).subscribe(list => {
      this.whileLoading = true;

      if (list.length) {
        this.dataSource = [];
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
    this.parkingRateManagement.reset();
    this.constantData = this.parameterDeTarifaService.getParamatroTarifaSelectedData();
    this.whileLoading = false;
    this.initialLoad(this.constantData);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
