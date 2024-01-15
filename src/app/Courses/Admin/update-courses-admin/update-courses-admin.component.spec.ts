import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoursesAdminComponent } from './update-courses-admin.component';

describe('UpdateCoursesAdminComponent', () => {
  let component: UpdateCoursesAdminComponent;
  let fixture: ComponentFixture<UpdateCoursesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCoursesAdminComponent]
    });
    fixture = TestBed.createComponent(UpdateCoursesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
