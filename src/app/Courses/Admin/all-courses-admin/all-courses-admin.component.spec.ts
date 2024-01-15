import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesAdminComponent } from './all-courses-admin.component';

describe('AllCoursesAdminComponent', () => {
  let component: AllCoursesAdminComponent;
  let fixture: ComponentFixture<AllCoursesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCoursesAdminComponent]
    });
    fixture = TestBed.createComponent(AllCoursesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
