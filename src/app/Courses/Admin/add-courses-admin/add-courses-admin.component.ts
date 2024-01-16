import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-add-courses-admin',
  templateUrl: './add-courses-admin.component.html',
  styleUrls: ['./add-courses-admin.component.css']
})
export class AddCoursesAdminComponent {
  newCourse: course = { idCourse: 0, nameCourse: '', description: '', price: 0 };

  constructor(
    private router: Router,
    private courseService: CoursesService,
    private http: HttpClient
  ) {}

  selectedFile: File | null = null;

  addCourse() {
    this.courseService.addCourse(this.newCourse).subscribe((response: any) => {
      console.log('Course added successfully', response);
        this.onUpload(response.idCourse);
      this.router.navigate(['/all']);
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(idCourse: number) {
    if (this.selectedFile) {
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      if (idCourse !== null && idCourse !== undefined) {
        uploadImageData.append('idCourse', idCourse.toString());
      }

      this.http.post('http://localhost:8089/image/upload', uploadImageData, { observe: 'response' })
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.status === 200) {
              console.log('Image uploaded successfully');
            } else {
              console.log('Image not uploaded successfully');
            }
          },
          (error) => {
            console.error('Error uploading image:', error);
          }
        );
    } else {
      console.error('No file selected.');
    }
  }
}
