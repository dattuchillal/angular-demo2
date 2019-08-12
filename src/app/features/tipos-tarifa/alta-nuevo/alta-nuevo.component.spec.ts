import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaNuevoComponent } from './alta-nuevo.component';

describe('AltaNuevoComponent', () => {
  let component: AltaNuevoComponent;
  let fixture: ComponentFixture<AltaNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
