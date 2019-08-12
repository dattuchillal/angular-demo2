import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterDeTarifaComponent } from './parameter-de-tarifa.component';

describe('ParameterDeTarifaComponent', () => {
  let component: ParameterDeTarifaComponent;
  let fixture: ComponentFixture<ParameterDeTarifaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterDeTarifaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterDeTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
