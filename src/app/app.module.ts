import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCoursesAdminComponent } from './Courses/Admin/add-courses-admin/add-courses-admin.component';
import { AllCoursesAdminComponent } from './Courses/Admin/all-courses-admin/all-courses-admin.component';
import { UpdateCoursesAdminComponent } from './Courses/Admin/update-courses-admin/update-courses-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCoursesAdminComponent,
    AllCoursesAdminComponent,
    UpdateCoursesAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
