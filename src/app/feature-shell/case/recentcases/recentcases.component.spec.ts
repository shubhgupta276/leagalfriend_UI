import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentcasesComponent } from './recentcases.component';

describe('RecentcasesComponent', () => {
  let component: RecentcasesComponent;
  let fixture: ComponentFixture<RecentcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentcasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
