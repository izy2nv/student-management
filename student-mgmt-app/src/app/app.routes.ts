import { Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { StudentComponent } from './components/student/student.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'students', pathMatch: 'full'
    },
    {
        path: 'student/:id', component: StudentComponent
    },
    {
        path: 'students', component: AllStudentsComponent
    },
    {
        path: 'add-student', component: AddStudentComponent
    },
    {
        path: 'edit-student/:id', component: EditStudentComponent
    },
    {
        path: 'students/:id/courses', component: StudentCoursesComponent
    }
];