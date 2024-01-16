import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-update-courses-admin',
  templateUrl: './update-courses-admin.component.html',
  styleUrls: ['./update-courses-admin.component.css']
})
export class UpdateCoursesAdminComponent {

  courseId!: number;
  existingCourse: course = { idCourse: 0, nameCourse: '', description: '', price: 0, };
  selectedFileName: string = ''; 

  constructor(private route: ActivatedRoute, private courseService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourseDetails();
    });
  }

  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe(
      (data: course) => {
        this.existingCourse = data;
      },
      (error) => {
        console.error(`Error loading course details for ID ${this.courseId}:`, error);
      }
    );
  }

  onFileChange(event: any) {
    const inputFile = event.target;

    if (inputFile.files && inputFile.files.length > 0) {
      this.selectedFileName = inputFile.files[0].name;
    } else {
      this.selectedFileName = '';
    }
  }

  updateCourse() {
    this.courseService.updateCourse(this.existingCourse).subscribe(() => {
      console.log('Course updated successfully');
      this.router.navigate(['/all']);
    });
  }
}
