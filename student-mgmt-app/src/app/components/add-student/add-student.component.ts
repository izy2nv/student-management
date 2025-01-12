import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PromptComponent } from '../../shared/prompt/prompt.component';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';
import { BlockPasteDirective } from '../../directives/block-paste.directive';
import { Subscription } from 'rxjs';
import { Message } from 'primeng/message';
import *  as Actions from '../../store/actions/students.actions';
import { ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-student-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    Message,
    RouterModule,
    PromptComponent,
    RouterLink,
    PhoneMaskDirective,
    BlockPasteDirective
  ],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent implements OnChanges, OnDestroy {
  @Input() isEditing: boolean = false;
  @Input() student: any;
  studentForm: FormGroup;
  addStudentErr: boolean = false;
  errorMsg: string | undefined;
  @ViewChild('prompt') prompt: PromptComponent | undefined;
  private subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private store: Store,
    private appComponent: AppComponent, private router: Router, private actionsSubject: ActionsSubject) {
    this.studentForm = this.fb.group({
      fName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      phone: ['', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14)
      ]
      ],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]
      ]
    });
  }

  ngOnChanges(): void {
    if (this.isEditing) {
      this.studentForm.patchValue(this.student);
    }
  }

  get fName(): any { return this.studentForm.get('fName') };
  get lName(): any { return this.studentForm.get('lName') };
  get email(): any { return this.studentForm.get('email') };
  get phone(): any { return this.studentForm.get('phone') };

  addStudent() {
    this.store.dispatch(Actions.addStudent({ student: this.studentForm.value }));
    this.handleRequestState(Actions.addStudentSuccess, 'add');
  }

  isFormValid() {
    return this.studentForm?.valid;
  }

  updateStudent() {
    let payload = { ...this.studentForm.value, id: this.student.id };
    this.store.dispatch(Actions.updateStudent({ student: payload }));
    this.handleRequestState(Actions.updateStudentSuccess, 'update');
  }

  showDialog() {
    this.prompt?.showPrompt("Are you sure you want to update this student's record?");
  }

  handleRequestState(action: any, method: string) {
    this.subscription = this.actionsSubject.pipe(
      ofType(action)
    ).pipe(
      take(1)).subscribe(action => {
        if (action) {
          this.appComponent.showSuccess(method == 'add' ? 'Student added successfully.' : 'Student updated successfully.');
          this.studentForm.reset();
          this.router.navigate(['students']);
        } else {
          if (method == 'update') {
            this.showErrMsg('An error occurred. Try again later.');
          }
        }
      });
  }

  showErrMsg(msg: string) {
    this.errorMsg = msg;
    this.addStudentErr = true;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
