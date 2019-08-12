import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTarifaHomeComponent } from './tipos-tarifa-home.component';

describe('TiposTarifaHomeComponent', () => {
  let component: TiposTarifaHomeComponent;
  let fixture: ComponentFixture<TiposTarifaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposTarifaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposTarifaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
