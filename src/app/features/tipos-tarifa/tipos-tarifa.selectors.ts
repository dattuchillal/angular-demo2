import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TipoTarifaState } from './tipo-tarifa.reducer';

import * as fromTipoTarifa from './tipo-tarifa.reducer';

export const selectTipoTarifaState = createFeatureSelector<TipoTarifaState>('tipoTarifa');

export const tiposTarifaDataLoaded = createSelector(
    selectTipoTarifaState,
    tiposTarifaState => tiposTarifaState.allTipoTarifaLoaded
);

export const selectTiposTarifaData = createSelector(
    selectTipoTarifaState,
    fromTipoTarifa.selectAll
);
