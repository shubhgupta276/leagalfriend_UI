import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemdashboardComponent } from './systemdashboard.component';

describe('SystemdashboardComponent', () => {
  let component: SystemdashboardComponent;
  let fixture: ComponentFixture<SystemdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
