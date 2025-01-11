import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { IStudent } from '../../interfaces/student';
import { PanelModule } from 'primeng/panel';
import { Store } from '@ngrx/store';
import { selectStudents, selectStudent } from '../../store/selectors/students.selector';
import { ActivatedRoute, Router } from '@angular/router';
import *  as Actions from '../../store/actions/students.actions';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-student',
  imports: [DividerModule, PanelModule, ButtonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private store: Store,) { }
  student: IStudent | undefined;
  studentId: string | null = this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.getStudentFromStore(this.studentId)
  }

  getStudentFromStore(id: string | null) {
    this.store.select(selectStudents).subscribe((students) => {
      this.student = students.find((student: IStudent) => student.id === id);
      if (!this.student) {
        this.getStudent();
      }
    });
  }

  getStudent() {
    this.store.dispatch(Actions.getStudent({ id: <string>this.studentId }));
    this.store.select(selectStudent).subscribe((student) => {
      this.student = student;
    });
  }

  editStudent() {
    this.router.navigate([`/edit-student/${this.studentId}`]);
  }

  manageCourses() {
    this.router.navigate([`students/${this.studentId}/courses`]);
  }
}
