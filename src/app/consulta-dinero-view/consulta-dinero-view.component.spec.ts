import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDineroViewComponent } from './consulta-dinero-view.component';

describe('ConsultaDineroViewComponent', () => {
  let component: ConsultaDineroViewComponent;
  let fixture: ComponentFixture<ConsultaDineroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDineroViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaDineroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
