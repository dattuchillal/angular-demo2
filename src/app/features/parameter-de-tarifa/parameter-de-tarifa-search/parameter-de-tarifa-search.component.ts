import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BREADCRUMB_PATHS } from '../../../core/constants/breadcrumb-paths.const';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-parameter-de-tarifa-search',
  templateUrl: './parameter-de-tarifa-search.component.html',
  styleUrls: ['./parameter-de-tarifa-search.component.scss'],
  animations: [
    trigger('filterState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class ParameterDeTarifaSearchComponent implements OnInit {
  isAdvanceSearch = false;
  private initialControls = {
    tipodeTarifa: '',
    description: '',
    vigenciaDesde: ''
  };
  @Input() compName: string;
  @Output() searchData = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();
  routeSnapShotParams = Object.keys(this.route.snapshot.params);
  breadcrumb: any[];
  breadcrumbPaths: any;
  literals: any = {
    paramTarifas: ''
  };
  parkingRateParametroManagement: FormGroup;
  tipoDeTarifaControl;
  tipoDeDescriptionControl;
  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.parkingRateParametroManagement = formBuilder.group(this.initialControls);
    this.tipoDeTarifaControl = this.parkingRateParametroManagement.get('tipodeTarifa');
    this.tipoDeDescriptionControl = this.parkingRateParametroManagement.get('description');
  }

  ngOnInit() {
    this.getTranslations();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.parkingRateParametroManagement.controls[controlName].hasError(errorName);
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

  parkingRateParametroManagementSubmit() {
    if (this.parkingRateParametroManagement.valid) {
      if (this.compName === 'home') {
        this.searchData.emit(this.parkingRateParametroManagement.value);
      } else {
        if (this.routeSnapShotParams.length) {
        }
      }
    }
  }

  advanceSearch() {
    this.isAdvanceSearch = !this.isAdvanceSearch;
    const controls: string[] = ['importeParkingMax', 'importeMinSinCompra', 'tiempoMaxSinCompra',
    'importeMin1Hora', 'importeMin2Hora', 'fraccionFacturacion', 'costeFraccion',
    'tiempoMaxSalida', 'numberOfCentros'];

    if (this.isAdvanceSearch) {
      this.addFormControls(controls);
    } else {
      this.removeFormControl(controls);
    }
  }

  private addFormControls(controls) {
    if (controls) {
      controls.forEach(element => {
        this.parkingRateParametroManagement.addControl(element, new FormControl(''));
      });
    }
  }

  private removeFormControl(controls) {
    if (controls) {
      controls.forEach(element => {
        this.parkingRateParametroManagement.removeControl(element);
      });
    }
  }

  discard() {
    this.cancel.emit();
    this.parkingRateParametroManagement.setValue({
      tipodeTarifa: '',
      description: '',
      vigenciaDesde: '',
      importeParkingMax: '',
      importeMinSinCompra: '',
      tiempoMaxSinCompra: '',
      importeMin1Hora: '',
      importeMin2Hora: '',
      fraccionFacturacion: '',
      costeFraccion: '',
      tiempoMaxSalida: '',
      numberOfCentros: ''
    });
  }
}
