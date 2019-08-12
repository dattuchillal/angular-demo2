import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { TipoTarifaActions, TipoTarifaActionTypes } from './tipo-tarifa.actions';
import { TipoTarifa } from './service/tipo-tarifa.service';

export function sortById(prev: TipoTarifa, next: TipoTarifa): number {
  return - prev.id - (next.id);
}

// Creating an EntityAdapter for the Collection of TipoTarifa
export const adapter: EntityAdapter<TipoTarifa> = createEntityAdapter<TipoTarifa>({
  // sortComparer: sortById
  sortComparer: false
});

/** Declaring the interface for the TipoTarifa state
 * interface EntityState<V> {
 *  ids: string[];
 *  entities: { [id: string]: V };
 * }
*/
export interface TipoTarifaState extends EntityState<TipoTarifa> {
  allTipoTarifaLoaded: boolean;
}

export const initialTipoTarifaState: TipoTarifaState = adapter.getInitialState({
  allTipoTarifaLoaded: false
});


export function tipoTarifaReducer(state = initialTipoTarifaState, action: TipoTarifaActions): TipoTarifaState {
  switch (action.type) {
    case TipoTarifaActionTypes.TipoTarifasLoaded:
      return adapter.addAll(action.payload.tipoTarifa, {...state, allTipoTarifaLoaded: true });

    case TipoTarifaActionTypes.TiposTarifaEdit:
      return adapter.updateOne(action.payload.tipoTarifa, state);

    case TipoTarifaActionTypes.TipoTarifaSave:
      return adapter.addOne(action.payload.tipoTarifa, state);

    case TipoTarifaActionTypes.TipoTarifaDelete:
      return adapter.removeOne(action.payload.tipoTarifaId, state);

    default: {
      return state;
    }
  }
}

// Needs to generate selectors for working with the TipoTarifaState
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();
