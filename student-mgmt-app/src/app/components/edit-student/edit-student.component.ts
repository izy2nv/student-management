import { Component, OnInit } from '@angular/core';
import { AddStudentComponent } from '../add-student/add-student.component';
import { Store } from '@ngrx/store';
import { IStudent } from '../../interfaces/student';
import { selectStudents, selectStudent } from '../../store/selectors/students.selector';
import { ActivatedRoute } from '@angular/router';
import *  as Actions from '../../store/actions/students.actions';

@Component({
  selector: 'app-edit-student',
  imports: [AddStudentComponent],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent implements OnInit {
  editObj: IStudent | undefined;
  studentId: string | null = this.route.snapshot.paramMap.get('id');
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudentFromStore(this.studentId)
  }

  getStudentFromStore(id: string | null) {
    this.store.select(selectStudents).subscribe((students) => {
      this.editObj = students.find((student: IStudent) => student.id === id);
      if (!this.editObj) {
        this.getStudent();
      }
    });
  }

  getStudent() {
    this.store.dispatch(Actions.getStudent({ id: <string>this.studentId }));
    this.store.select(selectStudent).subscribe((student) => {
      this.editObj = student;
    });
  }
}
