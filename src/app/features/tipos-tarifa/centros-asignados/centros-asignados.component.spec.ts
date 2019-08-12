import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosAsignadosComponent } from './centros-asignados.component';

describe('CentrosAsignadosComponent', () => {
  let component: CentrosAsignadosComponent;
  let fixture: ComponentFixture<CentrosAsignadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrosAsignadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
