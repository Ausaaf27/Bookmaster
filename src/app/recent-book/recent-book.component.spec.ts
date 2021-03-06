import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBookComponent } from './recent-book.component';

describe('RecentBookComponent', () => {
  let component: RecentBookComponent;
  let fixture: ComponentFixture<RecentBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
