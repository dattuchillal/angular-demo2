import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterDeTarifaHomeComponent } from './parameter-de-tarifa-home.component';

describe('ParameterDeTarifaHomeComponent', () => {
  let component: ParameterDeTarifaHomeComponent;
  let fixture: ComponentFixture<ParameterDeTarifaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterDeTarifaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterDeTarifaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
