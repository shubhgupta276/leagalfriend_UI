import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicechartComponent } from './invoice-chart.component';

describe('InvoicechartComponent', () => {
  let component: InvoicechartComponent;
  let fixture: ComponentFixture<InvoicechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
