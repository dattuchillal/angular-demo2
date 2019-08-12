import { Component, OnInit, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BREADCRUMB_PATHS } from '../../../core/constants/breadcrumb-paths.const';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../shared/dateAdapter/date.adapter';
import { HttpClient } from '@angular/common/http';
import { ParameterDeTarifaService, ParameterDeTarifas } from '../service/parameter-de-tarifa.service';
import { TipoTarifa } from '../../tipos-tarifa/service/tipo-tarifa.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { ParametroDeTarifaValidators } from '../validation/parametro-de-tarifa-validators';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-alta-nueva-tarifa-updation',
  templateUrl: './alta-nueva-tarifa-updation.component.html',
  styleUrls: ['./alta-nueva-tarifa-updation.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AltaNuevaTarifaUpdationComponent implements OnInit {
  @Output() parametroAltaNuevaEvent = new EventEmitter<any>();
  minDate = new Date();
  private unsubscribe = new Subject();
  tipoTarifaData: TipoTarifa;
  pageHeight: number;
  parametroAltaNuevaTarifa: FormGroup;
  breadcrumb: any[];
  breadcrumbPaths: any;
  tipodeTarifas: TipoTarifa[];
  literals: any = {
    paramTarifas: ''
  };
  routeSnapShotParams = Object.keys(this.route.snapshot.params);
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private translationService: TranslateService,
    private formBuilder: FormBuilder,
    private parameterDeTarifaService: ParameterDeTarifaService,
  ) {
    this.parametroAltaNuevaTarifa = formBuilder.group({
      fechaDesdeVigencia: ['', Validators.required],
      importeParkingMax: '',
      importeMinSinCompra: '',
      tiempoMaxSinCompra: '',
      importeMin1Hora: '',
      importeMin2Hora: '',
      fraccionFacturacion: ['', [Validators.required, ParametroDeTarifaValidators.numberShouldGreaterThanZero]],
      costeFraccion: ['', [Validators.required, ParametroDeTarifaValidators.numberShouldGreaterThanZero]],
      tiempoMaxSalida: '',
      tipodeTarifaId: ['', Validators.required]
    });
    if (this.routeSnapShotParams.length) {
      this.setDefaultValue(this.parameterDeTarifaService.getParamatroTarifaSelectedData());
    }

    this.parametroAltaNuevaTarifa.get('tipodeTarifaId').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged()
    )
    .subscribe(newValue => {
      this.tipoTarifaData = this.tipodeTarifas.filter(elem => elem.tipodeTarifa === newValue)[0];
      this.parametroAltaNuevaTarifa.get('tipodeTarifaId').setValue(this.tipoTarifaData.tipodeTarifa);
    });
  }

  ngOnInit() {
    this.pageHeight = window.innerHeight - 160;
    this.getTranslations();
    this.parameterDeTarifaService.findAllTipoTarifaData().subscribe(data => {
      this.tipodeTarifas = data;
      if (this.routeSnapShotParams.length) {
        this.tipoTarifaData = this.tipodeTarifas.filter(elem => elem.tipodeTarifa === this.route.snapshot.params['parametroDeTarifa'])[0];
        this.parametroAltaNuevaTarifa.get('tipodeTarifaId').setValue(this.tipoTarifaData.tipodeTarifa);
        this.parametroAltaNuevaTarifa.get('tipodeTarifaId').disable();
        this.parametroAltaNuevaTarifa.get('fechaDesdeVigencia').disable();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.pageHeight = window.innerHeight - 160;
  }

  parametroAltaNuevaTarifaSubmit() {
    if (this.parametroAltaNuevaTarifa.valid) {
      const userValue: ParameterDeTarifas = this.parametroAltaNuevaTarifa.getRawValue();
      const parametroDeTarifaId = this.routeSnapShotParams.length ? this.route.snapshot.params['parametroDeTarifaId'] : null;
      this.parametroAltaNuevaEvent.emit({
        formData: {
          costeFraccion: userValue.costeFraccion,
          fechaDesdeVigencia: moment(new Date(userValue.fechaDesdeVigencia)).format('YYYY-MM-DD').replace(/-/g, ''),
          endDate: null,
          startDate: null,
          fraccionFacturacion: userValue.fraccionFacturacion,
          tipodeTarifaId: this.tipoTarifaData.id,
          importeMin1Hora: userValue.importeMin1Hora,
          importeMin2Hora: userValue.importeMin2Hora,
          importeMinSinCompra: userValue.importeMinSinCompra,
          importeParkingMax: userValue.importeParkingMax,
          modificationCounter: null,
          tiempoMaxSalida: userValue.tiempoMaxSalida,
          tiempoMaxSinCompra: userValue.tiempoMaxSinCompra,
          id: parseInt(parametroDeTarifaId, 0)
        },
        isParam: this.routeSnapShotParams.length ? true : false,
        tipoDeTarifaData: this.tipoTarifaData ? this.tipoTarifaData : null
    });
    }
  }

  private getTranslations() {
    const currentLang = this.translationService.currentLang;
    this.translationService.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        { name: this.breadcrumbPaths.PARAM_TARIFAS.name }
      ];
    });
    this.translationService.onLangChange.subscribe( translations => {
      this.literals = translations.translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        { name: this.breadcrumbPaths.TIPOS_TARIFA.name }
      ];
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.parametroAltaNuevaTarifa.controls[controlName].hasError(errorName);
  }

  dateFormat(value: number): any {
    const val = value.toString();
    const dateFormatString = val.slice(0, 4) + '/' + val.slice(4, 6) + '/' + val.slice(6, 8);
    return new Date(dateFormatString);
  }

  private setDefaultValue(parametrotarifaData: ParameterDeTarifas) {
    if (parametrotarifaData) {
      this.parametroAltaNuevaTarifa.setValue({
        fechaDesdeVigencia: this.dateFormat(parametrotarifaData.fechaDesdeVigencia),
        importeParkingMax: parametrotarifaData.importeParkingMax,
        importeMinSinCompra: parametrotarifaData.importeMinSinCompra,
        tiempoMaxSinCompra: parametrotarifaData.tiempoMaxSinCompra,
        importeMin1Hora: parametrotarifaData.importeMin1Hora,
        importeMin2Hora: parametrotarifaData.importeMin2Hora,
        fraccionFacturacion: parametrotarifaData.fraccionFacturacion,
        costeFraccion: parametrotarifaData.costeFraccion,
        tiempoMaxSalida: parametrotarifaData.tiempoMaxSalida,
        tipodeTarifaId: null
      });
    }
  }

}
