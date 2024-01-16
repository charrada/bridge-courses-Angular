import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-update-courses-admin',
  templateUrl: './update-courses-admin.component.html',
  styleUrls: ['./update-courses-admin.component.css']
})
export class UpdateCoursesAdminComponent {
  courseId!: number;
  existingCourse: course = { idCourse: 0, nameCourse: '', description: '', price: 0 };
  selectedFileName: string = '';
  formData: FormData = new FormData();

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private router: Router,
    private http: HttpClient
  ) {}

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
      const file: File | null = inputFile.files[0];

      if (file) {
        this.formData.append('imageFile', file, file.name);
      }
    } else {
      this.selectedFileName = '';
      this.formData.delete('imageFile');
    }
  }

  updateCourse() {
    // Update course details
    this.courseService.updateCourse(this.existingCourse).subscribe(() => {
      console.log('Course details updated successfully');
      this.closeUpdate();
    });

    // Update image if selected
    if (this.formData.has('imageFile')) {
      this.http.put(`http://localhost:8089/image/update/${this.courseId}`, this.formData).subscribe(
        (response: any) => {
          console.log('Image updated successfully', response);
        },
        (error: any) => {
          console.error('Error updating image:', error);
        }
      );
    }
   this.closeUpdate();
    // Redirect after both updates
    this.router.navigate(['/all']);
  }

  closeUpdate(): void {
    $('#confirmationModal').modal('hide');
  }
}
