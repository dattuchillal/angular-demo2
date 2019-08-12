import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TipoTarifa {
  id: number;
  modificationCounter: number;
  description: string;
  tipodeTarifa: string;
  porDefecto?: boolean;
}

export interface TipoTarifaEto {
  tipodeTarifa: string;
  description: string;
}

export interface CentrosEto {
  tipodeTarifa: string;
  description: string;
  centreCode: string;
  centreDesc: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoTarifaService {
  selectedData: TipoTarifa;

  private readonly tipo_tarifa = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/tipotarifa/findAll';
  private readonly edit_tipo_tarifa = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/tipotarifa/update/';
  private readonly add_delete_tipo_tarifa = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/tipotarifa/';
  private readonly search_tipo_tarifa = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/tipotarifa/search/';
  private readonly centro_tarifa = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/centrotarifas/custom';
  private readonly delete_centro_tarifa = environment.serverUrl + 'services/rest/centrotarifamanagement/v1/centrotarifa/delete/';
  private readonly search_centro_tarifa = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/centrotarifas/search/';
  private readonly set_por_defecto = environment.serverUrl + 'services/rest/tipotarifamanagement/v1/tipotarifa/update-boolean/';
  private readonly tipo_centro_search = environment.serverUrl + 'services/rest/centrotarifamanagement/v1/centrotarifa/advance-search';

  constructor(
    private http: HttpClient
  ) { }

  findAllTipoTarifaData(): Observable<TipoTarifa[]> {
    return this.http.get<TipoTarifa[]>(this.tipo_tarifa);
  }

  editTipoTarifaData(data: TipoTarifa): Observable<TipoTarifa> {
    return this.http.put<TipoTarifa>(this.edit_tipo_tarifa + data.tipodeTarifa + '/'  + data.description, data);
  }

  addTipoTarifaData(data: TipoTarifaEto): Observable<TipoTarifa> {
    return this.http.post<TipoTarifa>(this.add_delete_tipo_tarifa, data);
  }

  deleteTipoTarifaData(data: TipoTarifa): Observable<TipoTarifa> {
    return this.http.delete<TipoTarifa>(this.add_delete_tipo_tarifa + data.id);
  }

  deleteCentroTarifaData(data: any): Observable<TipoTarifa> {
    return this.http.delete<any>(this.delete_centro_tarifa + data.centro + '/' + data.fechaDesdeVigencia);
  }

  searchTipoTarifaData(data: TipoTarifaEto): Observable<TipoTarifa[]> {
    return this.http.post<TipoTarifa[]>(this.search_tipo_tarifa, data);
  }

  setTipoTarifaSelectedData(data: TipoTarifa) {
    this.selectedData = data;
  }

  getTipoTarifaSelectedData() {
    return this.selectedData;
  }

  findAllCentrosData(data: TipoTarifaEto): Observable<TipoTarifa[]> {
    return this.http.post<TipoTarifa[]>(this.centro_tarifa, data);
  }

  searchCentrosData(data: CentrosEto): Observable<TipoTarifa[]> {
    return this.http.get<TipoTarifa[]>(this.search_centro_tarifa + data.tipodeTarifa + '/' + data.description
       + '/' + data.centreCode + '/' + data.centreDesc);
  }

  searchTipoCentrosData(data: any): Observable<any> {
    return this.http.post<any>(this.tipo_centro_search, data);
  }

  setPorDefecto(data: TipoTarifa): Observable<TipoTarifa[]> {
    return this.http.get<TipoTarifa[]>(this.set_por_defecto + data.id);
  }
}
