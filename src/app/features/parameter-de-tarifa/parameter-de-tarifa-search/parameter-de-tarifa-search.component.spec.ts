import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterDeTarifaSearchComponent } from './parameter-de-tarifa-search.component';

describe('ParameterDeTarifaSearchComponent', () => {
  let component: ParameterDeTarifaSearchComponent;
  let fixture: ComponentFixture<ParameterDeTarifaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterDeTarifaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterDeTarifaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
