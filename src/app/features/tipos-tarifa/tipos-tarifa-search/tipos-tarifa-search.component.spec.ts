import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTarifaSearchComponent } from './tipos-tarifa-search.component';

describe('TiposTarifaSearchComponent', () => {
  let component: TiposTarifaSearchComponent;
  let fixture: ComponentFixture<TiposTarifaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposTarifaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposTarifaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
