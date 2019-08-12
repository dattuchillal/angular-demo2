import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosAsignadoaComponent } from './centros-asignadoa.component';

describe('CentrosAsignadoaComponent', () => {
  let component: CentrosAsignadoaComponent;
  let fixture: ComponentFixture<CentrosAsignadoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrosAsignadoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrosAsignadoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
