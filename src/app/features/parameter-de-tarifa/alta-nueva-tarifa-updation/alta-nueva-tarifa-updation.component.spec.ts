import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaNuevaTarifaUpdationComponent } from './alta-nueva-tarifa-updation.component';

describe('AltaNuevaTarifaUpdationComponent', () => {
  let component: AltaNuevaTarifaUpdationComponent;
  let fixture: ComponentFixture<AltaNuevaTarifaUpdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaNuevaTarifaUpdationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaNuevaTarifaUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
