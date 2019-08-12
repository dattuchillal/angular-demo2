import { Component, OnInit, Input, EventEmitter, Output, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TipoTarifaService, TipoTarifa, TipoTarifaEto } from '../service/tipo-tarifa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { skip } from 'rxjs/operators';
import { AbandonProcessService } from 'src/app/core/services/abandon-process/abandon-process.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Update } from '@ngrx/entity';
import { TiposTarifaEdit, TipoTarifaSave } from '../tipo-tarifa.actions';

@Component({
  selector: 'app-tipos-tarifa-search',
  templateUrl: './tipos-tarifa-search.component.html',
  styleUrls: ['./tipos-tarifa-search.component.scss']
})
export class TiposTarifaSearchComponent implements OnInit {
  literals: any = {
    paramTarifas: ''
  };
  @Input() compName: any;
  @ViewChild('searchForm') searchForm: NgForm;
  @Output() searchData = new EventEmitter<TipoTarifaEto>();
  @Output() cancel = new EventEmitter();

  pageHeight: number;
  pageSize = 0;
  tipoDeTarifaControl;
  tipoDeDescriptionControl;
  tipoTarifaData: TipoTarifa;
  parkingRateManagement: FormGroup;
  routeSnapShotParams = Object.keys(this.route.snapshot.params);

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private tipoTarifaService: TipoTarifaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService,
    private abandonProcessService: AbandonProcessService,
    private store: Store<AppState>
  ) {
    this.parkingRateManagement = this.formBuilder.group({
      tipodeTarifa: '',
      description: ''
    });
    this.tipoDeTarifaControl = this.parkingRateManagement.get('tipodeTarifa');
    this.tipoDeDescriptionControl = this.parkingRateManagement.get('description');
    if (this.routeSnapShotParams.length) {
      this.tipoDeTarifaControl.disable();
    }
  }

  ngOnInit() {
    this.getTranslations();

    this.pageSize = window.innerHeight;
    if (this.compName === 'alta') {
      this.activateAbandonProcessOnDirty();
      this.tipoTarifaData = this.tipoTarifaService.getTipoTarifaSelectedData();
      this.pageHeight = window.innerHeight - 196;
      this.validatorsForTipoDeTarifaControl();
      this.validatorsForTipoDeDescriptionControl();
      if (this.tipoTarifaData) {
        this.parkingRateManagement.setValue({
          tipodeTarifa: this.tipoTarifaData.tipodeTarifa,
          description: this.tipoTarifaData.description
        });
      }
    } else if (this.compName === 'centros') {
      this.tipoTarifaData = this.tipoTarifaService.getTipoTarifaSelectedData();
      this.validatorsForTipoDeTarifaControl();
      this.validatorsForTipoDeDescriptionControl();
      if (this.tipoTarifaData) {
        this.parkingRateManagement.setValue({
          tipodeTarifa: this.tipoTarifaData.tipodeTarifa,
          description: this.tipoTarifaData.description
        });
      }
      this.tipoDeTarifaControl.disable();
      this.tipoDeDescriptionControl.disable();
    } else {
      this.pageSize = 0;
      this.parkingRateManagement.setValue({
        tipodeTarifa: '',
        description: ''
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.compName === 'alta') {
      console.log(event);
      this.pageHeight = window.innerHeight - 196;
    }
  }

  private activateAbandonProcessOnDirty() {
    this.parkingRateManagement.valueChanges.pipe(skip(1)).subscribe((values) => {
      if (this.parkingRateManagement.dirty) {

        this.abandonProcessService.activate(this.literals);

      }
    });
  }

  private getTranslations() {
    const currentLang = this.translationService.currentLang;
    this.translationService.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
    });

    this.translationService.onLangChange.subscribe(translations => {
      this.literals = translations.translations;
    });
  }

  discard() {
    this.cancel.emit();
    this.parkingRateManagement.setValue({
      tipodeTarifa: '',
      description: ''
    });
  }

  parkingRateManagementSubmit() {
    if (this.parkingRateManagement.valid) {
      if (this.compName === 'home') {
        this.searchData.emit(this.parkingRateManagement.value);
      } else {
        if (this.routeSnapShotParams.length) {
          const changes = this.parkingRateManagement.getRawValue();
          this.tipoTarifaService.editTipoTarifaData(this.parkingRateManagement.getRawValue()).subscribe(data => {
            this.alertService.success(this.literals.successRecord);
            const tipoTarifa: Update<TipoTarifa> = {
              id: data.id,
              changes
            };
            this.store.dispatch(new TiposTarifaEdit({ tipoTarifa }));
            this.abandonProcessService.deactivate();
            this.router.navigate(['/tipos-tarifa']);
          }, error => {
            this.alertService.danger(this.literals.generic_error_title);
          });
        } else {
          this.tipoTarifaService.addTipoTarifaData(this.parkingRateManagement.value).subscribe(data => {
            this.store.dispatch(new TipoTarifaSave({ tipoTarifa: data }));
            this.alertService.success(this.literals.successRecord);
            this.abandonProcessService.deactivate();
            this.router.navigate(['/tipos-tarifa']);
          }, ( error: HttpErrorResponse ) => {
            if (error.status === 409 ) {
              this.alertService.danger(error.error);
            } else {
              this.alertService.danger(this.literals.generic_error_title);
            }
          });
        }
      }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.parkingRateManagement.controls[controlName].hasError(errorName);
  }


  private validatorsForTipoDeTarifaControl() {
    this.tipoDeTarifaControl.setValidators([Validators.required]);
    this.tipoDeTarifaControl.updateValueAndValidity();
  }

  private validatorsForTipoDeDescriptionControl() {
    this.tipoDeDescriptionControl.setValidators([Validators.required]);
    this.tipoDeDescriptionControl.updateValueAndValidity();
  }

}
