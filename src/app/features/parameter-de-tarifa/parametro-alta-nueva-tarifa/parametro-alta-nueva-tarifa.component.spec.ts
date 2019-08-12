import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroAltaNuevaTarifaComponent } from './parametro-alta-nueva-tarifa.component';

describe('ParametroAltaNuevaTarifaComponent', () => {
  let component: ParametroAltaNuevaTarifaComponent;
  let fixture: ComponentFixture<ParametroAltaNuevaTarifaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroAltaNuevaTarifaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroAltaNuevaTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
