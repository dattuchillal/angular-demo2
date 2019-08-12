import { Action } from '@ngrx/store';
import { TipoTarifa } from './service/tipo-tarifa.service';
import { Update } from '@ngrx/entity';

export enum TipoTarifaActionTypes {
  TipoTarifasRequested = '[View Page] TipoTarifas Requested',
  TipoTarifasLoaded = '[TipoTarifa API] TipoTarifa Loaded',
  TiposTarifaEdit = '[Edit TipoTarifa] Tipo Tarifa Edit',
  TipoTarifaSave = '[Save TipoTarifa] TipoTarifa Saved',
  TipoTarifaDelete = '[Delete TipoTarifa] TipoTarifa Delete'
}

export class TipoTarifasRequested implements Action {
  readonly type = TipoTarifaActionTypes.TipoTarifasRequested;
}

export class TipoTarifasLoaded implements Action {
  readonly type = TipoTarifaActionTypes.TipoTarifasLoaded;
  constructor(
    public payload: {
      tipoTarifa: TipoTarifa[]
    }
  ) {}
}

export class TipoTarifaSave implements Action {
  readonly type = TipoTarifaActionTypes.TipoTarifaSave;
  constructor(
    public payload: { tipoTarifa: TipoTarifa }
  ) {}
}

export class TiposTarifaEdit implements Action {
  readonly type = TipoTarifaActionTypes.TiposTarifaEdit;
  constructor(public payload: { tipoTarifa: Update<TipoTarifa> }) {}
}

export class TipoTarifaDelete implements Action {
  readonly type = TipoTarifaActionTypes.TipoTarifaDelete;
  constructor(public payload: { tipoTarifaId: number}) {}
}

export type TipoTarifaActions =
  TipoTarifasRequested
  | TipoTarifasLoaded
  | TiposTarifaEdit
  | TipoTarifaSave
  | TipoTarifaDelete;
