import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../../shared/table/table.component';
import { IStudent } from '../../interfaces/student';
import { Store, ActionsSubject } from '@ngrx/store';
import { selectStudents } from '../../store/selectors/students.selector';
import { Router, RouterModule } from '@angular/router';
import { deleteStudent } from '../../store/actions/students.actions';
import { PromptComponent } from '../../shared/prompt/prompt.component';
import { AppComponent } from '../../app.component';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import *  as Actions from '../../store/actions/students.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-all-students',
  imports: [ButtonModule, TableComponent, RouterModule, PromptComponent, Message, CommonModule],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent implements OnInit, OnDestroy {
  students: IStudent[] = [];
  filterFields: Array<string> = ['name', 'phone', 'email'];
  cols: Array<object>;
  studentObj: IStudent | undefined;
  promptMsg: string | undefined;
  apiErr: boolean = false;
  errorMsg: string | undefined;
  @ViewChild('prompt') prompt: PromptComponent | undefined;
  private subscription: Subscription | undefined;

  constructor(private store: Store, private router: Router, private appComponent: AppComponent,
    private actionsSubject: ActionsSubject) {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'phone', header: 'Phone Number' },
      { field: 'email', header: 'Email Address' },
      {
        field: 'actions', header: 'Action',
        actions: [
          { fld: 'edit', label: 'Edit', severity: 'info' },
          { fld: 'delete', label: 'Delete', severity: 'danger' },
          { fld: 'manageCourses', label: 'Manage Courses', severity: 'secondary' },
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.getStudentsFromStore();
  }

  getStudentsFromStore() {
    this.store.select(selectStudents).subscribe((students) => {
      this.students = students;
      if (!this.students.length) {
        this.store.dispatch(Actions.getStudents());
      }
    });

  }

  handleAction(action: any) {
    switch (action.method) {
      case 'edit':
        this.editStudent(action.obj);
        break;
      case 'delete':
        this.studentObj = action.obj;
        this.showDialog('Are you sure you want to delete this student?');
        break;
      case 'manageCourses':
        this.router.navigate(['students/' + action.obj.id + '/courses']);
        break;
    }
  }

  editStudent(student: any) {
    this.studentObj = student;
    this.router.navigate(['/edit-student/' + student.id]);
  }

  showDialog(msg: string) {
    this.promptMsg = msg;
    this.prompt?.showPrompt(msg);
  }

  deleteStudent() {
    this.store.dispatch(deleteStudent({ id: <string>this.studentObj?.id }));
    this.subscription = this.actionsSubject.pipe(
      ofType(Actions.deleteStudentSuccess)
    ).pipe(
      take(1)).subscribe(action => {
        if (action) {
          this.appComponent.showSuccess('Student deleted successfully.');
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}