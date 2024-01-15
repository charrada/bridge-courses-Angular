import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursesAdminComponent } from './add-courses-admin.component';

describe('AddCoursesAdminComponent', () => {
  let component: AddCoursesAdminComponent;
  let fixture: ComponentFixture<AddCoursesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoursesAdminComponent]
    });
    fixture = TestBed.createComponent(AddCoursesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
