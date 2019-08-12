import { Component, OnInit, OnDestroy, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TipoTarifaService, TipoTarifa } from '../service/tipo-tarifa.service';
import { Subscription, Observable, of } from 'rxjs';
import { BREADCRUMB_PATHS } from 'src/app/core/constants/breadcrumb-paths.const';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { AbandonProcessService } from 'src/app/core/services/abandon-process/abandon-process.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers';
import * as fromTipoTarifa from './../tipo-tarifa.reducer';
import { TipoTarifasRequested, TipoTarifaDelete } from '../tipo-tarifa.actions';
import { Update } from '@ngrx/entity';
import { selectTiposTarifaData } from '../tipos-tarifa.selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tipos-tarifa-home',
  templateUrl: './tipos-tarifa-home.component.html',
  styleUrls: ['./tipos-tarifa-home.component.scss']
})
export class TiposTarifaHomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  dataSource: TipoTarifa[] = [];
  whileLoading = false;
  columns = [];
  literals: any = {
    tiposTarifa: ''
  };
  breadcrumb: any[];
  breadcrumbPaths: any;
  constructor(
    private readonly translationService: TranslateService,
    private tipoTarifaService: TipoTarifaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertSerive: AlertsService,
    private abandonProcessService: AbandonProcessService,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.tipoTarifaService.setTipoTarifaSelectedData(null);
    this.store.dispatch(new TipoTarifasRequested());
    this.subscriptions.add(this.store.pipe(
      select(selectTiposTarifaData),
      filter(tipoTarifaData => tipoTarifaData.length > 0)
    )
    .subscribe(data => {
      this.whileLoading = true;
      this.dataSource = data;
    }));
  }

  ngOnInit() {
    this.getTranslations();
    this.abandonProcessService.deactivate();
  }

  private geIinitialState() {
    this.subscriptions.add(this.store.pipe(
      select(selectTiposTarifaData),
      filter(tipoTarifaData => tipoTarifaData.length > 0)
    )
    .subscribe(data => {
      this.whileLoading = true;
      this.dataSource = data;
    }));
  }

  private initialLoad() {
    this.subscriptions.add(this.tipoTarifaService.findAllTipoTarifaData().subscribe((data: TipoTarifa[]) => {
      this.dataSource = data.reverse();
      this.whileLoading = true;
    }));
  }

  private getTranslations() {
    const currentLang = this.translationService.currentLang;
    this.translationService.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        { name: this.breadcrumbPaths.TIPOS_TARIFA.name }
      ];
      this.setColumns(this.literals);
    });
    this.translationService.onLangChange.subscribe(translations => {
      this.literals = translations.translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        { name: this.breadcrumbPaths.TIPOS_TARIFA.name }
      ];
      this.setColumns(this.literals);
    });
  }

  edit(data: TipoTarifa) {
    this.tipoTarifaService.setTipoTarifaSelectedData(data);
    this.router.navigate(['alta', data.id], { relativeTo: this.route });
  }

  delete(tipoTarifData: TipoTarifa) {
    if (tipoTarifData.porDefecto) {
      this.alertSerive.danger(this.literals.porDefectoDeleteError);
    } else {
      this.whileLoading = false;
      this.tipoTarifaService.deleteTipoTarifaData(tipoTarifData).subscribe(data => {
        this.alertSerive.success(this.literals.successDelete);
        this.store.dispatch(new TipoTarifaDelete({tipoTarifaId: tipoTarifData.id}));
        this.whileLoading = true;
      }, error => {
        this.whileLoading = true;
        this.alertSerive.danger(this.literals.generic_error_title);
      });
    }

  }

  checkCenter(data: TipoTarifa) {
    this.tipoTarifaService.setTipoTarifaSelectedData(data);
    this.router.navigate(['centros-asignados'], { relativeTo: this.route });
  }

  setPorDefecto(data: TipoTarifa) {
    this.whileLoading = false;
    this.tipoTarifaService.setPorDefecto(data).subscribe(porDefecto => {
      this.initialLoad();
    });
  }

  search(data) {
    this.whileLoading = false;
    this.tipoTarifaService.searchTipoTarifaData(data).subscribe(list => {
      this.whileLoading = true;
      if (list['content'].length) {
        this.dataSource = list['content'];
      } else {
        this.dataSource = [];
        this.alertSerive.warning(this.literals.noRecord);
      }
    }, error => {
      this.whileLoading = true;
      this.alertSerive.danger(this.literals.generic_error_title);
    });
  }

  async cancel(): Promise<void> {
    this.whileLoading = false;
    this.changeDetectorRef.detectChanges();
    this.geIinitialState();
  }

  setColumns(literals) {
    this.columns = [
      { name: 'tipodeTarifa', label: literals.tiposTarifaTitle },
      { name: 'description', label: literals.tiposTarifa.descripcion },
      { name: 'porDefecto', label: literals.tiposTarifa.tipoPorDefecto }
    ];
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
