import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTarifaComponent } from './tipos-tarifa.component';

describe('TiposTarifaComponent', () => {
  let component: TiposTarifaComponent;
  let fixture: ComponentFixture<TiposTarifaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposTarifaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
