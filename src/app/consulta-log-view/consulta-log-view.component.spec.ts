import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaLogViewComponent } from './consulta-log-view.component';

describe('ConsultaLogViewComponent', () => {
  let component: ConsultaLogViewComponent;
  let fixture: ComponentFixture<ConsultaLogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaLogViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
