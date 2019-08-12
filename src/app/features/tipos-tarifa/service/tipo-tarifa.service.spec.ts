import { TestBed } from '@angular/core/testing';

import { TipoTarifaService } from './tipo-tarifa.service';

describe('TipoTarifaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoTarifaService = TestBed.get(TipoTarifaService);
    expect(service).toBeTruthy();
  });
});
