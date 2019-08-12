import { Effect, ofType, Actions } from '@ngrx/effects';
import { TipoTarifaActionTypes, TipoTarifasRequested, TipoTarifasLoaded, TipoTarifaSave } from './tipo-tarifa.actions';
import { withLatestFrom, mergeMap, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../reducers';
import { tiposTarifaDataLoaded } from './tipos-tarifa.selectors';
import { TipoTarifaService } from './service/tipo-tarifa.service';

@Injectable()
export class TiposTarifaEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private tipoTarifaService: TipoTarifaService
    ) {

    }

@Effect()
loadTiposTarifa$ = this.actions$
    .pipe(
        ofType<TipoTarifasRequested> (TipoTarifaActionTypes.TipoTarifasRequested),
        withLatestFrom(this.store.pipe(select(tiposTarifaDataLoaded))),
        filter(([action, allTipoTarifaLoaded]) => !allTipoTarifaLoaded),
        mergeMap(() => this.tipoTarifaService.findAllTipoTarifaData()),
        map(tipoTarifa => new TipoTarifasLoaded({ tipoTarifa }))
    );

@Effect({ dispatch: false})
saveTiposTarifas$ = this.actions$
    .pipe(
        ofType<TipoTarifaSave> (TipoTarifaActionTypes.TipoTarifaSave),
        withLatestFrom(this.store.pipe(select(tiposTarifaDataLoaded))),
        map(tipoTarifaData => tipoTarifaData.reverse())
    );
}
