import { TestBed } from '@angular/core/testing';

import { ParameterDeTarifaService } from './parameter-de-tarifa.service';

describe('ParameterDeTarifaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterDeTarifaService = TestBed.get(ParameterDeTarifaService);
    expect(service).toBeTruthy();
  });
});
